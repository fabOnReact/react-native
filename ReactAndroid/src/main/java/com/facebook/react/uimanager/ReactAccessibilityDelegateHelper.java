/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

package com.facebook.react.uimanager;

import android.content.Context;
import androidx.annotation.Nullable;
import androidx.core.view.accessibility.AccessibilityNodeInfoCompat;
import androidx.core.view.accessibility.AccessibilityNodeInfoCompat.AccessibilityActionCompat;
import com.facebook.react.R;
import com.facebook.react.bridge.Dynamic;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import java.util.HashMap;

/** Helper class that deals with emitting Scroll Events. */
public class ReactAccessibilityDelegateHelper {
  public static final String TOP_ACCESSIBILITY_ACTION_EVENT = "topAccessibilityAction";
  public static final HashMap<String, Integer> sActionIdMap = new HashMap<>();

  static {
    sActionIdMap.put("activate", AccessibilityActionCompat.ACTION_CLICK.getId());
    sActionIdMap.put("longpress", AccessibilityActionCompat.ACTION_LONG_CLICK.getId());
    sActionIdMap.put("increment", AccessibilityActionCompat.ACTION_SCROLL_FORWARD.getId());
    sActionIdMap.put("decrement", AccessibilityActionCompat.ACTION_SCROLL_BACKWARD.getId());
  }

  /**
   * These roles are defined by Google's TalkBack screen reader, and this list should be kept up to
   * date with their implementation. Details can be seen in their source code here:
   *
   * <p>https://github.com/google/talkback/blob/master/utils/src/main/java/Role.java
   */
  public enum AccessibilityRole {
    NONE,
    BUTTON,
    TOGGLEBUTTON,
    LINK,
    SEARCH,
    IMAGE,
    IMAGEBUTTON,
    KEYBOARDKEY,
    TEXT,
    ADJUSTABLE,
    SUMMARY,
    HEADER,
    ALERT,
    CHECKBOX,
    COMBOBOX,
    MENU,
    MENUBAR,
    MENUITEM,
    PROGRESSBAR,
    RADIO,
    RADIOGROUP,
    SCROLLBAR,
    SPINBUTTON,
    SWITCH,
    TAB,
    TABLIST,
    TIMER,
    LIST,
    TOOLBAR;

    public static AccessibilityRole fromValue(@Nullable String value) {
      for (AccessibilityRole role : AccessibilityRole.values()) {
        if (role.name().equalsIgnoreCase(value)) {
          return role;
        }
      }
      throw new IllegalArgumentException("Invalid accessibility role value: " + value);
    }
  };

  public static String getAccessibilityValue(AccessibilityRole role) {
    switch (role) {
      case BUTTON:
        return "android.widget.Button";
      case TOGGLEBUTTON:
        return "android.widget.ToggleButton";
      case SEARCH:
        return "android.widget.EditText";
      case IMAGE:
        return "android.widget.ImageView";
      case IMAGEBUTTON:
        return "android.widget.ImageButon";
      case KEYBOARDKEY:
        return "android.inputmethodservice.Keyboard$Key";
      case TEXT:
        return "android.widget.TextView";
      case ADJUSTABLE:
        return "android.widget.SeekBar";
      case CHECKBOX:
        return "android.widget.CheckBox";
      case RADIO:
        return "android.widget.RadioButton";
      case SPINBUTTON:
        return "android.widget.SpinButton";
      case SWITCH:
        return "android.widget.Switch";
      case LIST:
        return "android.widget.AbsListView";
      case NONE:
      case LINK:
      case SUMMARY:
      case HEADER:
      case ALERT:
      case COMBOBOX:
      case MENU:
      case MENUBAR:
      case MENUITEM:
      case PROGRESSBAR:
      case RADIOGROUP:
      case SCROLLBAR:
      case TAB:
      case TABLIST:
      case TIMER:
      case TOOLBAR:
        return "android.view.View";
      default:
        throw new IllegalArgumentException("Invalid accessibility role value: " + role);
    }
  }

  private static final String TAG = "ReactAccessibilityDelegateHelper ";
  // State constants for states which have analogs in AccessibilityNodeInfo
  private static final String STATE_DISABLED = "disabled";
  private static final String STATE_SELECTED = "selected";
  private static final String STATE_CHECKED = "checked";

  protected static void setState(
      AccessibilityNodeInfoCompat info, ReadableMap accessibilityState, Context context) {
    final ReadableMapKeySetIterator i = accessibilityState.keySetIterator();
    while (i.hasNextKey()) {
      final String state = i.nextKey();
      final Dynamic value = accessibilityState.getDynamic(state);
      if (state.equals(STATE_SELECTED) && value.getType() == ReadableType.Boolean) {
        info.setSelected(value.asBoolean());
      } else if (state.equals(STATE_DISABLED) && value.getType() == ReadableType.Boolean) {
        info.setEnabled(!value.asBoolean());
      } else if (state.equals(STATE_CHECKED) && value.getType() == ReadableType.Boolean) {
        final boolean boolValue = value.asBoolean();
        info.setCheckable(true);
        info.setChecked(boolValue);
        if (info.getClassName().equals(getAccessibilityValue(AccessibilityRole.SWITCH))) {
          info.setText(
              context.getString(
                  boolValue ? R.string.state_on_description : R.string.state_off_description));
        }
      }
    }
  }
}

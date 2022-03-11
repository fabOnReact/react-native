/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

package com.facebook.react.uimanager;

import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.accessibility.AccessibilityEvent;
import androidx.core.view.AccessibilityDelegateCompat;
import androidx.core.view.accessibility.AccessibilityNodeInfoCompat;
import com.facebook.react.R;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.views.scroll.ReactScrollView;

public class ReactScrollViewAccessibilityDelegate<T> extends AccessibilityDelegateCompat {
  private final String TAG = ReactScrollViewAccessibilityDelegate.class.getSimpleName();
  T obj;

  public ReactScrollViewAccessibilityDelegate(T obj) {
    super();
    this.obj = obj;
  }

  public T getObject() {
    return this.obj;
  }

  public void sayHello() {
    Log.w("TESTING::ReactScrollView", "sayHello");
  }

  @Override
  public void onInitializeAccessibilityEvent(View host, AccessibilityEvent event) {
    super.onInitializeAccessibilityEvent(host, event);
    onInitializeAccessibilityEventInternal(host, event);
  }

  public boolean isPartiallyScrolledInView(T view, View nextChild) {
    Log.w(TAG, "isPartiallyScrolledInView not implemented");
    return false;
  }

  public View getContentView(T view) {
    Log.w(TAG, "getContentView not implemented");
    return (View) view;
  }

  public void onInitializeAccessibilityEventInternal(View view, AccessibilityEvent event) {
    if (!(view instanceof ReactScrollView)) return;
    final ReadableMap accessibilityCollection =
        (ReadableMap) view.getTag(R.id.accessibility_collection);

    if (accessibilityCollection != null) {
      event.setItemCount(accessibilityCollection.getInt("itemCount"));
      View contentView = getContentView((T) view);
      Integer firstVisibleIndex = null;
      Integer lastVisibleIndex = null;

      if (!(contentView instanceof ViewGroup)) {
        return;
      }

      for (int index = 0; index < ((ViewGroup) contentView).getChildCount(); index++) {
        View nextChild = ((ViewGroup) contentView).getChildAt(index);
        boolean isVisible = isPartiallyScrolledInView((T) view, nextChild);

        ReadableMap accessibilityCollectionItem =
            (ReadableMap) nextChild.getTag(R.id.accessibility_collection_item);

        if (!(nextChild instanceof ViewGroup)) {
          return;
        }

        int childCount = ((ViewGroup) nextChild).getChildCount();

        // If this child's accessibilityCollectionItem is null, we'll check one more
        // nested child.
        // Happens when getItemLayout is not passed in FlatList which adds an additional
        // View in the hierarchy.
        if (childCount > 0 && accessibilityCollectionItem == null) {
          View nestedNextChild = ((ViewGroup) nextChild).getChildAt(0);
          if (nestedNextChild != null) {
            ReadableMap nestedChildAccessibility =
                (ReadableMap) nestedNextChild.getTag(R.id.accessibility_collection_item);
            if (nestedChildAccessibility != null) {
              accessibilityCollectionItem = nestedChildAccessibility;
            }
          }
        }

        if (isVisible == true && accessibilityCollectionItem != null) {
          if (firstVisibleIndex == null) {
            firstVisibleIndex = accessibilityCollectionItem.getInt("itemIndex");
          }
          lastVisibleIndex = accessibilityCollectionItem.getInt("itemIndex");
        }

        if (firstVisibleIndex != null && lastVisibleIndex != null) {
          event.setFromIndex(firstVisibleIndex);
          event.setToIndex(lastVisibleIndex);
        }
      }
    }
  }

  @Override
  public void onInitializeAccessibilityNodeInfo(View host, AccessibilityNodeInfoCompat info) {
    super.onInitializeAccessibilityNodeInfo(host, info);
    if (host instanceof ReactScrollView) {
      ReactScrollView scrollView = (ReactScrollView) host;
      onInitializeAccessibilityNodeInfoInternal(scrollView, info);
    } else {
      Log.w(
          TAG,
          TAG
              + " method onInitializeAccessibilityNodeInfo was called with host: "
              + host
              + " not instanceof ReactScrollView");
    }
  };

  public void onInitializeAccessibilityNodeInfoInternal(
      ReactScrollView scrollView, AccessibilityNodeInfoCompat info) {
    final ReactAccessibilityDelegate.AccessibilityRole accessibilityRole =
        (ReactAccessibilityDelegate.AccessibilityRole) scrollView.getTag(R.id.accessibility_role);

    if (accessibilityRole != null) {
      ReactAccessibilityDelegate.setRole(info, accessibilityRole, scrollView.getContext());
    }

    final ReadableMap accessibilityCollection =
        (ReadableMap) scrollView.getTag(R.id.accessibility_collection);

    if (accessibilityCollection != null) {
      int rowCount = accessibilityCollection.getInt("rowCount");
      int columnCount = accessibilityCollection.getInt("columnCount");
      boolean hierarchical = accessibilityCollection.getBoolean("hierarchical");

      AccessibilityNodeInfoCompat.CollectionInfoCompat collectionInfoCompat =
          AccessibilityNodeInfoCompat.CollectionInfoCompat.obtain(
              rowCount, columnCount, hierarchical);
      info.setCollectionInfo(collectionInfoCompat);
    }

    info.setScrollable(scrollView.getScrollEnabled());
  }
};

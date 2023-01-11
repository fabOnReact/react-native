/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

package com.facebook.react.views.text;

import android.content.res.AssetManager;
import android.graphics.Rect;
import android.graphics.Typeface;
import android.text.TextPaint;
import android.text.style.MetricAffectingSpan;
import androidx.annotation.Nullable;
import com.facebook.common.logging.FLog;
import com.facebook.infer.annotation.Nullsafe;

@Nullsafe(Nullsafe.Mode.LOCAL)
public class CustomStyleSpan extends MetricAffectingSpan implements ReactSpan {

  /**
   * A {@link MetricAffectingSpan} that allows to change the style of the displayed font.
   * CustomStyleSpan will try to load the fontFamily with the right style and weight from the
   * assets. The custom fonts will have to be located in the res/assets folder of the application.
   * The supported custom fonts extensions are .ttf and .otf. For each font family the bold, italic
   * and bold_italic variants are supported. Given a "family" font family the files in the
   * assets/fonts folder need to be family.ttf(.otf) family_bold.ttf(.otf) family_italic.ttf(.otf)
   * and family_bold_italic.ttf(.otf). If the right font is not found in the assets folder
   * CustomStyleSpan will fallback on the most appropriate default typeface depending on the style.
   * Fonts are retrieved and cached using the {@link ReactFontManager}
   */
  private final AssetManager mAssetManager;

  private final int mStyle;
  private final int mWeight;
  private final @Nullable String mFeatureSettings;
  private final @Nullable String mFontFamily;
  private final String mCurrentText;
  private String mTextAlignVertical;
  private int mHighestLineHeight;
  private static float mFontSize;

  public CustomStyleSpan(
      int fontStyle,
      int fontWeight,
      @Nullable String fontFeatureSettings,
      @Nullable String fontFamily,
      AssetManager assetManager,
      @Nullable String textAlignVertical,
      String currentText,
      @Nullable int fontSize) {
    mStyle = fontStyle;
    mWeight = fontWeight;
    mFeatureSettings = fontFeatureSettings;
    mFontFamily = fontFamily;
    mAssetManager = assetManager;
    mTextAlignVertical = textAlignVertical;
    mCurrentText = currentText;
    mFontSize = fontSize;
  }

  @Override
  public void updateDrawState(TextPaint ds) {
    apply(
        ds,
        mStyle,
        mWeight,
        mFeatureSettings,
        mFontFamily,
        mAssetManager,
        mTextAlignVertical,
        mCurrentText,
        mHighestLineHeight);
  }

  @Override
  public void updateMeasureState(TextPaint paint) {
    apply(
        paint,
        mStyle,
        mWeight,
        mFeatureSettings,
        mFontFamily,
        mAssetManager,
        mTextAlignVertical,
        mCurrentText,
        mHighestLineHeight);
  }

  public int getStyle() {
    return mStyle == ReactBaseTextShadowNode.UNSET ? Typeface.NORMAL : mStyle;
  }

  public int getWeight() {
    return mWeight == ReactBaseTextShadowNode.UNSET ? TypefaceStyle.NORMAL : mWeight;
  }

  public @Nullable String getFontFamily() {
    return mFontFamily;
  }

  private static void apply(
      TextPaint paint,
      int style,
      int weight,
      @Nullable String fontFeatureSettings,
      @Nullable String family,
      AssetManager assetManager,
      @Nullable String textAlignVertical,
      String currentText,
      int highestLineHeight) {
    Typeface typeface =
        ReactTypefaceUtils.applyStyles(paint.getTypeface(), style, weight, family, assetManager);
    paint.setFontFeatureSettings(fontFeatureSettings);
    paint.setTypeface(typeface);
    paint.setSubpixelText(true);

    if (currentText != null) {
      Rect bounds = new Rect();
      paint.getTextBounds(currentText, 0, currentText.length(), bounds);
      if (textAlignVertical == "top-child") {
        if (highestLineHeight != 0) {
          // the span with the highest lineHeight sets the height for all rows
          paint.baselineShift -= highestLineHeight / 2 - paint.getTextSize() / 2;
        } else {
          String methodName = new Object() {}.getClass().getEnclosingMethod().getName();
          FLog.w(
              "React::" + "CustomStyleSpan",
              methodName
                  + " mCurrentText: "
                  + (currentText)
                  + " paint.getFontMetrics().top: "
                  + (paint.getFontMetrics().top)
                  + " paint.ascent(): "
                  + (paint.ascent())
                  + " paint.baselineShift: "
                  + (paint.baselineShift)
                  + " paint.getFontMetrics().bottom: "
                  + (paint.getFontMetrics().bottom)
                  + " paint.descent(): "
                  + (paint.descent())
                  + " paint.getTextSize(): "
                  + (paint.getTextSize())
                  + " mFontSize: "
                  + (mFontSize));
          // works only with single line
          // if lineHeight is not set, align the text using the font metrics
          // https://stackoverflow.com/a/27631737/7295772
          // top      -------------  -41  ^               ^
          // ascent   -------------  -36  | -51   | +36   ^ -15
          // baseline __my Text____   0   |       v       ^
          // descent  _____________   9   |               ^
          // bottom   _____________   10  |
          // paint.baselineShift +=
          //    (paint.getFontMetrics().top - paint.getFontMetrics().ascent) * mFontSize / 33;
        }
      }
      if (textAlignVertical == "bottom-child") {
        if (highestLineHeight != 0) {
          paint.baselineShift += highestLineHeight / 2 - paint.getTextSize() / 2;
        } else {
          // paint.baselineShift += (paint.getFontMetrics().bottom - paint.descent()) * mFontSize /
          // 33;
        }
      }
    }
  }

  public void updateSpan(int highestLineHeight) {
    mHighestLineHeight = highestLineHeight;
  }
}

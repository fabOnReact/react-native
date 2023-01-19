/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

package com.facebook.react.views.text;

import android.text.TextPaint;
import android.text.style.AbsoluteSizeSpan;

/*
 * Wraps {@link AbsoluteSizeSpan} as a {@link ReactSpan}.
 */
public class ReactAbsoluteSizeSpan extends AbsoluteSizeSpan implements ReactSpan {
  private static final String TAG = "ReactAbsoluteSizeSpan";
  private String mTextAlignVertical = "center-child";
  private int mHighestLineHeight = 0;
  private int mHighestFontSize = 0;

  public ReactAbsoluteSizeSpan(int size) {
    super(size);
  }

  public ReactAbsoluteSizeSpan(int size, String textAlignVertical) {
    this(size);
    mTextAlignVertical = textAlignVertical;
  }

  public String getTextAlignVertical() {
    return mTextAlignVertical;
  }

  @Override
  public void updateDrawState(TextPaint ds) {
    super.updateDrawState(ds);
    if (mTextAlignVertical == "center-child") {
      return;
    }
    if (mHighestLineHeight == 0) {
      // align the text by font metrics
      // https://stackoverflow.com/a/27631737/7295772
      if (mTextAlignVertical == "top-child") {
        ds.baselineShift += ds.getFontMetrics().top - ds.ascent() - ds.descent();
      }
      if (mTextAlignVertical == "bottom-child") {
        ds.baselineShift += ds.getFontMetrics().bottom - ds.descent();
      }
    } else {
      /*
      inline image
      if (mTextAlignVertical == "top-child") {
        ds.baselineShift -= mHighestLineHeight;
      }
      if (mTextAlignVertical == "center-child") {
        ds.baselineShift -= mHighestLineHeight / 2;
      }
      */
      if (mHighestFontSize == getSize()) {
        // aligns text vertically in the lineHeight
        if (mTextAlignVertical == "top-child") {
          ds.baselineShift -= mHighestLineHeight / 2 - getSize() / 2;
        }
        if (mTextAlignVertical == "bottom-child") {
          ds.baselineShift += mHighestLineHeight / 2 - getSize() / 2 - ds.descent();
        }
      } else if (mHighestFontSize != 0) {
        // align correctly text that has smaller font
        if (mTextAlignVertical == "top-child") {
          ds.baselineShift -=
              mHighestLineHeight / 2
                  - mHighestFontSize / 2
                  + (mHighestFontSize - getSize())
                  + (ds.getFontMetrics().top - ds.getFontMetrics().ascent);
        }
        if (mTextAlignVertical == "bottom-child") {
          ds.baselineShift += mHighestLineHeight / 2 - mHighestFontSize / 2 - ds.descent();
        }
      }
    }
  }

  public void updateSpan(int highestLineHeight, int highestFontSize) {
    mHighestLineHeight = highestLineHeight;
    mHighestFontSize = highestFontSize;
  }
}

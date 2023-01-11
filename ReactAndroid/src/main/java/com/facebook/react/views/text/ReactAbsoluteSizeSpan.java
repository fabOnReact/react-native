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
  private String mTextAlignVertical;

  public ReactAbsoluteSizeSpan(int size, @Nullable String textAlignVertical) {
    super(size);
    mTextAlignVertical = textVerticalAlign;
  }

  @Override
  public void updateDrawState(TextPaint ds) {
    if (mTextAlignVertical == "top-child") {
      ds.baselineShift += 50;
    }
  }

  @Override
  public void updateMeasureState(TextPaint paint) {
    // paint.baselineShift += 50;
  }
}

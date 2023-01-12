/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

package com.facebook.react.views.text;

import android.text.TextPaint;
import android.text.style.AbsoluteSizeSpan;
import androidx.annotation.NonNull;
import com.facebook.common.logging.FLog;

/*
 * Wraps {@link AbsoluteSizeSpan} as a {@link ReactSpan}.
 */
public class ReactAbsoluteSizeSpan extends AbsoluteSizeSpan implements ReactSpan {
  private static final String TAG = "ReactAbsoluteSizeSpan";

  public ReactAbsoluteSizeSpan(int size) {
    super(size);
  }

  @Override
  public void updateDrawState(@NonNull TextPaint ds) {
    super.updateDrawState(ds);
    String methodName = new Object() {}.getClass().getEnclosingMethod().getName();
    FLog.w(
        "React::" + TAG,
        methodName
            + " ds.getFontMetrics().top: "
            + (ds.getFontMetrics().top)
            + " ds.getFontMetrics().bottom: "
            + (ds.getFontMetrics().bottom)
            + " getSize(): "
            + (getSize()));
  }
}

/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

package com.facebook.react.views.text;

import android.text.ParcelableSpan;
import android.text.style.LeadingMarginSpan;
import android.text.style.ParagraphStyle;

/**
 * This class is used in {@link TextLayoutManager} to linkify and style a span of text with
 * accessibilityRole="link". This is needed to make nested Text components accessible.
 *
 * <p>For example, if your React component looks like this:
 *
 * <pre>{@code
 * <Text>
 *   Some text with
 *   <Text onPress={onPress} accessible={true} accessibilityRole="link">a link</Text>
 *   in the middle.
 * </Text>
 * }</pre>
 *
 * then only one {@link ReactTextView} will be created, for the parent. The child Text component
 * does not exist as a native view, and therefore has no accessibility properties. Instead, we have
 * to use spans on the parent's {@link ReactTextView} to properly style the child, and to make it
 * accessible (TalkBack announces that the text has links available, and the links are exposed in
 * the context menu).
 */
public interface ReactLeadingMarginSpan extends ParagraphStyle {
  /**
   * The standard implementation of LeadingMarginSpan, which adjusts the margin but does not do any
   * rendering.
   */
  public static class Standard extends LeadingMarginSpan.Standard
      implements LeadingMarginSpan, ParcelableSpan, ReactSpan {

    /**
     * Constructor taking separate indents for the first and subsequent lines.
     *
     * @param first the indent for the first line of the paragraph
     * @param rest the indent for the remaining lines of the paragraph
     */
    public Standard(int first, int rest) {
      super(first, rest);
    }

    /**
     * Constructor taking an indent for all lines.
     *
     * @param every the indent of each line
     */
    public Standard(int every) {
      this(every, every);
    }
  }
}

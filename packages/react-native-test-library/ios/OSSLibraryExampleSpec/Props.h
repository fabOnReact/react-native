
/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GeneratePropsH.js
 */
#pragma once

#include <react/renderer/components/view/ViewProps.h>
#include <react/renderer/core/PropsParserContext.h>
#include <vector>

namespace facebook::react {

class SampleNativeComponentProps final : public ViewProps {
 public:
  SampleNativeComponentProps() = default;
  SampleNativeComponentProps(const PropsParserContext& context, const SampleNativeComponentProps &sourceProps, const RawProps &rawProps);

#pragma mark - Props

  Float opacity{0.0};
  std::vector<int> values{};
};

} // namespace facebook::react

export const bootstrapConfig = {
  bootstrapCSS: false, // Or `css: false`
  bootstrapVueCSS: false, // Or `bvCSS: false`
  icons: false,
  componentPlugins: [
    'BreadcrumbPlugin',
    'AlertPlugin',
    'DropdownPlugin',
    'FormCheckboxPlugin',
    'NavbarPlugin',
    'TabsPlugin',
    'PaginationPlugin',
    'ModalPlugin',
    'SpinnerPlugin',
    'FormTimepickerPlugin',
    'FormDatepickerPlugin',
    'FormSpinbuttonPlugin',
    'FormTextareaPlugin',
    'FormRadioPlugin',
    'ImagePlugin',
    'FormInputPlugin',
  ],
  directivePlugins: ['VBPopoverPlugin', 'VBTooltipPlugin', 'VBTogglePlugin'],
}

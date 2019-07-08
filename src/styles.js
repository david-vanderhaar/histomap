const createTheme = (background = '#282c34', element_body = '#eadcbd', element_text = '#282c34', chart_lines = '#eadcbd') => {
  return {
    background,
    element_body,
    element_text,
    chart_lines,
  }
}

export const themes = {
  dark: createTheme(),
  light: createTheme('#eadcbd', '#282c34', '#eadcbd', '#282c34'),
}
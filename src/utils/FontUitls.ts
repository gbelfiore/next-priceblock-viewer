const addCssToDocument = (cssText: string) => {
  const currentExtraFonts = document.querySelectorAll('.extra-fonts');
  if (currentExtraFonts.length > 0) {
    currentExtraFonts.forEach((current) => current.remove());
  }
  const styleElement = document.createElement('style');
  styleElement.classList.add('extra-fonts');
  styleElement.appendChild(document.createTextNode(cssText));
  document.head.appendChild(styleElement);
};

const cssToJson = (cssText: string) => {
  const cssJson = [];
  const fontFaceRegex = /@font-face\s*{([^}]*)}/g;
  let match: any;

  while ((match = fontFaceRegex.exec(cssText)) !== null) {
    const cssRule = match[1].trim();
    const ruleJson: any = {};

    cssRule.split(';').forEach((declaration: { trim: () => { (): any; new (): any; length: number }; split: (arg0: string) => [any, any] }) => {
      if (declaration.trim().length === 0) return;
      const [property, value] = declaration.split(':');
      ruleJson[property.trim()] = value.trim();
    });

    cssJson.push(ruleJson);
  }

  return cssJson;
};

const getExtraFonts = async (url: string) => {
  const res = await fetch(url);
  const cssText = await res.text();
  const cssJson = cssToJson(cssText);
  addCssToDocument(cssText);
  return cssJson;
};

export { addCssToDocument, cssToJson, getExtraFonts };

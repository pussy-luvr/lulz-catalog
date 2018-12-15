function boilerplate({ body, title, bgColor }) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
      </head>

      <body bgcolor=${bgColor}>
        <div id="root">${body}</div>
      </body>
    </html>
  `;
};

module.exports = boilerplate;

const defaultStyles = `
body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
ol,
li,
blockquote,
figure,
hr {
  margin: 0;
  padding: 0;
}

/* Set base font size and line height */
body {
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
}

/* Set max width and center content */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Style links */
a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Style buttons */
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

/* Style form elements */
input,
select,
textarea {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
}

input[type="checkbox"] {
  width: auto;
  margin-right: 5px;
}

/* Style headings */
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-bottom: 10px;
}

/* Style paragraphs */
p {
  margin-bottom: 10px;
}

/* Style list items */
ul,
ol {
  margin-bottom: 10px;
}

/* Style list items */
li {
  margin-bottom: 5px;
}
`;

export default defaultStyles;

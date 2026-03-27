
function SanitizedHtml({ text }) {
    return <div dangerouslySetInnerHTML={{ __html: text }} />;
}

export default SanitizedHtml;
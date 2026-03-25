
import sanitizeHtml from 'sanitize-html';

const sanitizeText = ( text ) => {
    
    return sanitizeHtml(text, {
        allowedTags: [
            'h1','h2','h3','h4','h5','h6',
            'b','i','strong','em','u','strike','sub','sup',
            'p','br','ul','ol','li','blockquote','pre','code',
            'span','div','img','a'
        ],
        allowedAttributes: {
            a: ['href', 'name', 'target', 'rel'],
            img: ['src', 'alt', 'width', 'height', 'style'],
            span: ['style'],
            div: ['style'],
            p: ['style']
        },
        allowedStyles: {
            '*': {
            'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(/],
            'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
            'font-weight': [/^\d+$/, /^bold$/, /^normal$/],
            'font-style': [/^italic$/, /^normal$/],
            'text-decoration': [/^underline$/, /^line-through$/]
            }
        }
    });
}

export default sanitizeText;
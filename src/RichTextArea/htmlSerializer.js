import React from 'react';
import Html from 'slate-html-serializer';

const BLOCK_TAGS = {
  p: 'paragraph',
  ul: 'unordered-list',
  li: 'list-item',
  ol: 'ordered-list',
  img: 'image'
};

const MARK_TAGS = {
  em: 'italic',
  strong: 'bold',
  u: 'underline'
};

const INLINE_TAGS = {
  a: 'link'
};

const rules = [
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName];
      if (!type) {
        return;
      }

      const data = {};
      switch (type) {
        case 'image': {
          data.src = el.attribs.src;
          break;
        }
        default: break;
      }

      return {
        object: 'block',
        type,
        data,
        nodes: next(el.children)
      };
    },
    serialize(obj, children) {
      if (obj.object !== 'block') {
        return;
      }

      switch (obj.type) {
        case 'paragraph': return <p>{children}</p>;
        case 'list-item': return <li>{children}</li>;
        case 'ordered-list': return <ol>{children}</ol>;
        case 'unordered-list': return <ul>{children}</ul>;//data-hook="editor-image"
        case 'image': return <img data-hook="editor-image" src={obj.data.get('src')}/>;
        default: return {children};
      }
    }
  },
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName];
      if (!type) {
        return;
      }

      return {
        object: 'mark',
        type,
        nodes: next(el.children)
      };
    },
    serialize(obj, children) {
      if (obj.object !== 'mark') {
        return;
      }

      switch (obj.type) {
        case 'bold': return <strong>{children}</strong>;
        case 'italic': return <em>{children}</em>;
        case 'underline': return <u>{children}</u>;
        default: return {children};
      }
    }
  },
  {
    deserialize(el, next) {
      const type = INLINE_TAGS[el.tagName];
      if (!type) {
        return;
      }

      return {
        object: 'inline',
        type,
        data: {
          href: el.attribs.href
        },
        nodes: next(el.children)
      };
    },
    serialize(obj, children) {
      if (obj.object !== 'inline') {
        return;
      }

      switch (obj.type) {
        case 'link': return <a rel="noopener noreferrer" target="_blank" href={obj.data.get('href')}>{children}</a>;
        default: return {children};
      }
    }
  }
];

export default new Html({rules});

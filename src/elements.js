import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';

import Attributes from './attributes';
import CdataElement from './cdata-el';
import CommentElement from './comment-el';
import InstructionElement from './instruction-el';
import TextElement from './text-el';

function getIndentationString(size) {
    return new Array(size + 1).join(" ");
}

function isTextElement(elements) {
    return elements.length === 1 && elements[0].type === "text";
}

function onSelectText(e) {
    e.stopPropagation()
}

const Element = memo(({ name, elements, attributes, theme, indentation, indentSize, collapsible, onPick }) => {
    function onTagClick() {
        if (onPick) {
            onPick(`/${name}`);
        }
    }

    function onAttrClick(xpath) {
        if (onPick) {
            onPick(`/${name}${xpath}`);
        }
    }

    function onElementsClick(xpath) {
        if (onPick) {
            onPick(`/${name}${xpath}`);
        }
    }

    return (
        <div className={onPick ? ' rxv-element --onPick' : 'rxv-element'} style={{ whiteSpace: 'pre' }} onClick={onTagClick}>
            <span style={{ color: theme.separatorColor }}>{`${indentation}<`}</span>
            <span className={onPick ? ' rxv-element__name --onPick' : 'rxv-element'} style={{ color: theme.tagColor }}>{name}</span>
            {<Attributes onPick={onAttrClick} attributes={attributes} theme={theme} /> }
            <span style={{ color: theme.separatorColor }}>{(elements ? '>' : '/>')}</span>
            {elements && <span onClick={onSelectText}><Elements onPick={onElementsClick} elements={elements} theme={theme} indentation={indentation + getIndentationString(indentSize)} indentSize={indentSize} collapsible={collapsible} /></span>}
            {elements && <span style={{ color: theme.separatorColor }}>{`${(isTextElement(elements)) ? "" : indentation}</`}</span>}
            {elements && <span className={onPick ? ' rxv-element__name --onPick' : 'rxv-element'} style={{ color: theme.tagColor }}>{name}</span>}
            {elements && <span style={{ color: theme.separatorColor }}>{">"}</span>}
        </div>
    );
});

Element.propTypes = {
    name: PropTypes.string.isRequired,
    elements: PropTypes.arrayOf(PropTypes.object),
    attributes: PropTypes.object,
    theme: PropTypes.object.isRequired,
    indentation: PropTypes.string.isRequired,
    indentSize: PropTypes.number.isRequired,
    collapsible: PropTypes.bool.isRequired,
}

const getElement = (theme, indentation, indentSize, collapsible, onElmPick) => (element, index) => {
    switch (element.type) {
        case "text":
            return <TextElement key={`el-${index}`} text={element.text} theme={theme} />;
        case "element":
            return <Element onPick={onElmPick} key={`el-${index}`} name={element.name} elements={element.elements} attributes={element.attributes} theme={theme} indentation={indentation} indentSize={indentSize} collapsible={collapsible} />
        case "comment":
            return <CommentElement key={`el-${index}`} comment={element.comment} theme={theme} indentation={indentation} />;
        case "cdata":
            return <CdataElement key={`el-${index}`} cdata={element.cdata} theme={theme} indentation={indentation} />;
        case "instruction":
            return <InstructionElement onPick={onElmPick} key={`el-${index}`} instruction={element.instruction} name={element.name} theme={theme} indentation={indentation} />;
        default:
            return null;
    }
}

const Elements = memo(({ elements, theme, indentation, indentSize, collapsible, onPick }) => {
    function onElmPick(xpath) {
        if (onPick) {
            onPick(xpath);
        }
    }

    return elements.map(getElement(theme, indentation, indentSize, collapsible, onElmPick));
});

Elements.propTypes = {
    elements: PropTypes.arrayOf(PropTypes.object),
    theme: PropTypes.object.isRequired,
    indentation: PropTypes.string.isRequired,
    indentSize: PropTypes.number.isRequired,
    collapsible: PropTypes.bool.isRequired,
}

export default Elements;

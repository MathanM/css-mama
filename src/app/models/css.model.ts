export interface CSSProp {
    id: number;
    css: string;
    prop: string;
    type: string;
    pg: string[];
    madeOf: number[];
    shortHand: any[];
    values: CSSValue[];
    desc: string[];
    browser: BrowserSupport;
}

interface CSSExample {
    example: string;
    html: string;
}

export interface CSSSelector {
    id: number;
    css: string;
    prop: string;
    desc: string[];
    browser: BrowserSupport;
    examples: CSSExample[];
}

export interface CSSObject {
    [key: string]: CSSProp;
}

export interface CSSValue {
    name: string;
    desc: string;
    default?: boolean;
}

export interface BrowserSupport {
    c: string;
    i: string;
    f: string;
    s: string;
    o: string;
}

export interface CSSGroup {
    group: string;
    value: number[];
}

export interface CSSSelectorObject {
    [key: string]: CSSSelector;
}

export interface CSSExampleValue {
    example: string;
    desc: string;
}

export interface CSSPropExample {
    id: number;
    examples: CSSExampleValue[];
    pg: number[];
}

export interface CSSExampleObject {
    [key: string]: CSSPropExample;
}


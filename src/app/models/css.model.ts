export interface CSSProp {
    id: number;
    css: string;
    prop: string;
    type: string;
    pg: string[];
    style?: string;
    show?: string;
    class?: string;
    min?: string;
    max?: string;
    extension?: boolean;
    madeOf: number[];
    shortHand: any[];
    values: CSSValue[];
    desc: string[];
    browser: BrowserSupport;
}

export interface CSSSelector {
    id: number;
    css: string;
    prop: string;
    desc: string[];
    browser: BrowserSupport;
    examples: CSSExampleValue[];
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
    desc?: string;
    html?: string;
}

export interface CSSPropExample {
    id: number;
    examples: CSSExampleValue[];
    pg: number[];
    pgChild?: CSSChildExample[];
    required?: CSSRequiredProp[];
    comment?: string;
}
export interface CSSChildExample{
    className: string;
    pg: CSSChildProp[];
    required?: CSSRequiredProp[];
    comment?: string;
}
export interface CSSChildProp{
    id: string;
    value?: string;
}
export interface CSSRequiredProp{
    prop: string;
    value: string;
}

export interface CSSExampleObject {
    [key: string]: CSSPropExample;
}


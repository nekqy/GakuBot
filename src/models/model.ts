export interface IText {
    text: string;
}
export interface IPartOfSpeech {
    pos: string
}
export interface IMeaning extends IText { };
export interface ISynonym extends IText { };
export interface IExample extends IText {
    tr: IText[]
}
export interface ITranslation extends IText, IPartOfSpeech {
    syn: ISynonym[],
    mean: IMeaning[],
    ex: IExample[]
}
export interface IDef extends IText, IPartOfSpeech {
    tr: ITranslation[]
}

export class Word {
    value: string;
    def: IDef[];
    pic: string | undefined;

    constructor(value: string, def: IDef[], pic?: string) {
        this.value = value = '';
        this.def = def;
        this.pic = pic;
        this.normalize();
    }
    normalize() {
        this.def.forEach(definition => {
            definition.text = definition.text || '';
            definition.pos = definition.pos || '';

            if (!definition.tr) {
                definition.tr = [];
            }
            definition.tr.forEach((translation: ITranslation) => {
                translation.text = translation.text || '';
                translation.pos = translation.pos || '';

                if (!translation.syn) {
                    translation.syn = [];
                }
                translation.syn.forEach((synonym: ISynonym) => {
                    synonym.text = synonym.text || '';
                });
                if (!translation.mean) {
                    translation.mean = [];
                }
                translation.mean.forEach((meaning: IMeaning) => {
                    meaning.text = meaning.text || '';
                });
                if (!translation.ex) {
                    translation.ex = [];
                }
                translation.ex.forEach((example: IExample) => {
                    example.text = example.text || '';

                    if (!example.tr) {
                        example.tr = [];
                    }
                    example.tr.forEach((translation: IText) => {
                        translation.text = translation.text || '';
                    });
                });
            });
        });
    }

    getTranslations(): string {
        let result: string = '';
        let count = 0;
        this.def.forEach(definition => {
            count++;
            result += count + '\\)\n';
            definition.tr.forEach((translation: ITranslation) => {
                result += '*' + translation.text + '*';

                // result += '   synonyms: ';
                // translation.syn.forEach((synonym: ISynonym) => {
                //     result += synonym.text + ', ';
                // });
                // result += '\n';

                result += ' \\(';
                translation.mean.forEach((mean: ISynonym) => {
                    result += '/' + mean.text.replace(/ /g, '\\_') + ', ';
                });
                result += '\\)\n';

                translation.ex.forEach((example: ISynonym) => {
                    result += '   ' + example.text + '\n';
                });
            });
            // result += '\n';
        });
        return result;
    }
}
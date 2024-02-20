import { getImageSrc } from '../../api/models-api'

export class SDModel {
    constructor(modelData,variables) {
        this.modelId = modelData.id;
        this.name = modelData.name;
        this.imageSrc = getImageSrc(modelData.image);
        this.variables = []
        variables.forEach((variable) => {
            this.variables.push(new ModelVariable(variable))
        })
    }

    getModelId() {
        return this.modelId;
    }

    getName() {
        return this.name;
    }

    getImageSrc() {
        return this.imageSrc;
    }

    getVariables() {
        return this.variables;
    }
}
    
class ModelVariable {
    constructor(variableData) {
        this.id = variableData['key']
        this.name = variableData['Real Name'];
        this.comment = variableData['Comment'];
        this.type = variableData['Type'];
        this.subtype = variableData['Subtype'];
        this.units = variableData['Units'];
    }

    getName() {
        return this.name;
    }

    getFormattedName() {
        return this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase();
    }

    getComment() {
        return this.comment;
    }

    getType() {
        return this.type;
    }

    getSubtype() {
        return this.subtype;
    }

    getUnits() {
        return this.units;
    }

    getId() {
        return this.id;
    }
}

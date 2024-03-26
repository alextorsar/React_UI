import { getImageSrc } from '../../api/models-api'

export class SDModel {
    constructor(modelData,variables) {
        this.modelId = modelData.id;
        this.name = modelData.name;
        this.imageSrc = getImageSrc(modelData.image);
        this.file = modelData.file
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

    getFile() {
        return this.file;
    }

    getVariables() {
        return this.variables;
    }

    getVariablesOfType(type){
        return this.getVariables().filter((variable) => {
            return variable.getType() === type;
        })
    }

    getVariableById(id){
        return this.getVariables().find((variable) => {
            return variable.getId() === id;
        })
    }
    getTypesOfVariables() {
        const types = new Set();
        this.getVariables().forEach((variable) => {
            var type = variable.getType()
            if(type != null){
                types.add(type)
            }  
        })
        return Array.from(types)
    }

    getModelInAPIFormat(){
        var variablesInAPIFormat = []
        this.variables.forEach((variable) => {
            variablesInAPIFormat.push(variable.getVariableInAPIFormat()) 
        })
        return {
            'id': this.modelId,
            'name': this.name,
            'image': this.imageSrc,
            'variables': variablesInAPIFormat
        }
    }

}
    
export class ModelVariable {
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

    getVariableInAPIFormat(){
        return {
            'key': this.id,
            'Real Name': this.name,
            'Comment': this.comment,
            'Type': this.type,
            'Subtype': this.subtype,
            'Units': this.units
        }
    }
}

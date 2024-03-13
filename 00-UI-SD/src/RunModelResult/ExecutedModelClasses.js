import { SDModel, ModelVariable } from '../Model/ModelClasses'

export class ExecutedModel extends SDModel {
    constructor(model, variables, executedVariables) {
        super(model,variables);
        this.executedVariables = [];
        variables.forEach((variable) => {
            this.executedVariables.push(new ExecutedVariable(variable, executedVariables[variable['Real Name']]))
        })
    }

    getExecutedVariables() {
        return this.executedVariables;
    }

    getVariablesOfType(type){
        var result = this.getExecutedVariables().filter((variable) => {
            return variable.getType() === type;
        })
        return result
    }

    getStartTime(){
        var i = 0
        var startTime = -1
        while(startTime === -1){
            if(this.executedVariables[i].getName() == 'INITIAL TIME'){
                startTime = this.executedVariables[i].getData()[0]
            }
            i++
        }
        return startTime
    }

    getCharacteristicTime(){
        var i = 0
        var characteristicTime = -1
        while(characteristicTime === -1){
            if(this.executedVariables[i].getName() == 'Characteristic Time'){
                characteristicTime = this.executedVariables[i].getData()[0]
            }
            i++
        }
        return characteristicTime
    }

    getTimeArray(){
        var time = []
        time[0] = this.getStartTime()
        for(var i=1; i<this.executedVariables[0].getData().length; i++){
            time[i] = time[i-1] + this.getCharacteristicTime()
        }
        return time
    }
}

export class ExecutedVariable extends ModelVariable {
    constructor(variableData, executionData) {
        super(variableData);
        this.data = executionData;
    }

    getData() {
        return this.data;
    }
}

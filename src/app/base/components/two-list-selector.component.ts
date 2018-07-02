import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'two-list-selector',
    templateUrl: './two-list-selector.component.html',
    styleUrls: ['./two-list-selector.component.scss']
})

export class TwoListSelectorComponent {
    @Input() public sourceList: any[]
    @Input() public targetList: any[]
    @Input() name: string

    constructor() { }

    onItemClick(item: any){
        item.selected = !item.selected;
    }

    onMoveItems(isAdd: boolean){
        var source = isAdd? this.sourceList : this.targetList;
        var target = isAdd? this.targetList : this.sourceList;

        for(let i = source.length - 1; i >= 0 ; i--){
            let item = source[i];
            if(item.selected){
                item.selected = false;
                target.push(item);
                source.splice(i, 1);
            }
        }
    }

    getSelectedItems(){
        return this.targetList.map(item => item.value);
    }
}
class ComponentAdder{

    constructor(){}

    add(parent, child){
        parent.append(child);
    }

    addAfterOtherComponent(child, parent){
        parent.after(child);
    }

    addBeforeOtherComponent(parent, child){
        parent.parentNode.insertBefore(child, parent);
    }

}
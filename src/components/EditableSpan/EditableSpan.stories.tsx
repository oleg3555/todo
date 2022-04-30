import React from "react";
import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
    title: 'EditableSpan',
    component: EditableSpan,
}

const changeTitleCallback = action('Title was changed');

export const EditableSpanBaseExample = () => {
    return <EditableSpan title='Hello Storybook' changeTitle={changeTitleCallback}/>
}
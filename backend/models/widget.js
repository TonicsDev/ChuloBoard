import zod from "zod";

const widgetModel = zod.object({
    name: zod.string({
        invalid_type_error: "widget_id must be a string",
        required_error: "The widget_id field is required"
    }).regex(/[A-Za-z0-9]/)
});


function validateWidget(object) {
    return widgetModel.safeParse(object);
}

export {widgetModel, validateWidget};
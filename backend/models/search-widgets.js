import zod from "zod";

const widgetFilters = zod.object({
    name: zod.string({
        invalid_type_error: "widget_name must be a string",
        required_error: "The widget_name field is required"
    }).regex(/[A-Za-z0-9]/)
});


function validateWidgetFilters(object) {
    return widgetFilters.partial().safeParse(object);
}

export {widgetFilters, validateWidgetFilters}
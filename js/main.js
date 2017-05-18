/*
 * Global object containing search inputs and attributes
 *
 * Default values are set in case of direct search without filtering
 * Ideally this object should come from server.
 */
var search = {
    attributes: {
        period: {
            handle: 2,
            value: 7,
            property: "days",
            ui_string: "7 days"
        },
        radius: {
            value: 1010,
            property: -1,
            ui_string: "everywhere"
        },
        price: {
            from: 20,
            to: 600,
            currency: "eur",
            ui_string: "From 20 to 600 eur"
        },
        categories: [1],
        sort_by: {
            ui_string: "distance",
            sort_id: 1
        }
    }
};
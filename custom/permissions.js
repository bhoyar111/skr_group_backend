module.exports = {
    permissions: [
        {
            name: "Users",
            methods: [
                { srno: 1, route_name: "users",          display_name: "List",   checked: false },
                { srno: 2, route_name: "user-add",       display_name: "Add",    checked: false },
                { srno: 3, route_name: "user-update",    display_name: "Edit",   checked: false },
                { srno: 4, route_name: "user-delete",    display_name: "Delete", checked: false }
            ]
        },
        {
            name: "Roles",
            methods: [
                { srno: 5, route_name: "roles",          display_name: "List",   checked: false },
                { srno: 6, route_name: "role-add",       display_name: "Add",    checked: false },
                { srno: 7, route_name: "role-update",    display_name: "Edit",   checked: false },
                { srno: 8, route_name: "role-delete",    display_name: "Delete", checked: false }
            ]
        },
       
    ]
};
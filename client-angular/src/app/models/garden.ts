export interface Garden{
    _id: String,
    name: String,

    direction: String,
    surrounding: String,
    directSun: Boolean,
    userID: String,
    plants: [],
    currentTemp:{value: Number , date: Date},
    currentLight:{value: Number , date: Date},
    currentMoist:{value: Number , date: Date}

}
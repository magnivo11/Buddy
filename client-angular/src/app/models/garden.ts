export interface Garden{
    _id: String,
    name: String,

    direction: String,
    surrounding: String,
    directSun: Boolean,
    userID: String,
    plants: Array<String>,
    currentTemp: Object,
    currentLight: Object,
    currentMoist: Object,
    created: Date,
    lastUpdated: Date,

}
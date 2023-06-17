import { SHOW_MODEL } from "@models";

export const getShows = async (query: any, limit: number, skip: number) => {
    console.log(query, limit, skip);
    let shows = await SHOW_MODEL.find(query).limit(limit).skip(skip);
    let count = await SHOW_MODEL.count(query);
    return {shows, count};
}

export const getShowFilterOptions = async () => {
    let shows = await SHOW_MODEL.aggregate([
        {
            $group: {
                _id: '$type',
                count: {$sum: 1}
            }
        },
        {
            $project: {
                _id: 0,
                type: '$_id',
            }
        },
        {
            $group: {
                _id: null,
                types: {$push: "$type"}
            }
        },
        {
            $project: {
                _id: 0,
                types: 1
            }
        }
    ])
    return shows[0].types;
}
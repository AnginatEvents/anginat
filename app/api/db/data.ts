import MockData from "./MOCK_DATA.json";

type Code = {
    code: string;
    lastChecked: Date;
    uploaded: Date;
    checked: number;
};

export const data: Code[] = MockData.map((item: any) => ({
    code: item.code,
    lastChecked: new Date(item.lastChecked),
    uploaded: new Date(item.uploaded),
    checked: item.checked,
}));

export const getCodes = async () => {
    return data;
};

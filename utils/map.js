export default class Map {
    frequency2WordMap = {
        0: '一个月内',
        1: '两个月内',
        2: '三个月内'
    }
    type2WordMap = {
        0: '招聘信息',
        1: '面试经验',
        2: '心得体会'
    }
    word2frequencyMap = {
        '一个月内': 0,
        '两个月内': 1,
        '三个月内': 2
    }
    word2TypeMap = {
        '招聘信息': 0,
        '面试经验': 1,
        '心得体会': 2
    }
}
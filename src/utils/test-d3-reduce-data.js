import { rollups, sum } from 'd3'
function testReduce(data) {
    if ( data === undefined || data.length === 0 ) { return {lebels: [], datasets: []} }
    let groupData = rollups(
        data,
        v => sum(v, d => d.times),
        d => d.case_type.name,
        d => new Date(d.date).toLocaleDateString('en-CA', { month: 'short' }) + '-' + new Date(d.date).toLocaleDateString('en-CA', { year: 'numeric' }),  
    )
    return groupData
}

const data = [
    {case_type: {name: 'airstrike'}, times: 3, date: '2021-2-5'},
    {case_type: {name: 'massacre'}, times: 3, date: '2021-2-5'},
    {case_type: {name: 'casualty'}, times: 3, date: '2021-2-5'},
    {case_type: {name: 'airstrike'}, times: 3, date: '2021-2-5'},
    {case_type: {name: 'airstrike'}, times: 3, date: '2021-2-5'},
    {case_type: {name: 'airstrike'}, times: 3, date: '2021-2-10'},
    {case_type: {name: 'airstrike'}, times: 3, date: '2021-2-15'},
    {case_type: {name: 'airstrike'}, times: 3, date: '2021-3-15'},


]
const result = testReduce(data)
console.log(result)
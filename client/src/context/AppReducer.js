export default (state, action) => {
    switch(action.type) {
        case 'DELETE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.filter(expense => expense.id !== action.payload)
            }
        case 'DELETE_INCOME':
            return {
                ...state,
                incomes: state.incomes.filter(income => income.id !== action.payload)
            }
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [action.payload, ...state.expenses]
            }
        case 'ADD_INCOME':
            return {
                ...state,
                incomes: [action.payload, ...state.incomes]
            }
        default:
            return state
    }
}
export interface IModelProps {
    error : {
        err:unknown,
        ErrorComponent: () => React.JSX.Element
    },
    loading: {
        isLoading: boolean,
        LoadingComponent: () => React.JSX.Element
    }
}


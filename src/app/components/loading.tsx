const Loading = () => {

    return(
    <div className="text-center	flex flex-col justify-center items-center h-screen w-screen">
        <h1 className="mb-2">Loading...</h1>
        <progress className="progress w-56">
            <div className="indeterminate">Loading</div>
        </progress>
    </div>
    );
};

export default Loading;
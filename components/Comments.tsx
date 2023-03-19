
export default function Comments (): JSX.Element {

    return (
        <div>
            <form className="flex flex-col p-5 max-w-2xl mx-auto mb-10">
                <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
                <h3 className="text-3xl font-bold">Leave a comment below.</h3>
                <hr className="py-3 mt-2"/>
                <div className="block mb-5">
                    <label>
                        <span className="text-gray-700">Name</span>
                    </label>
                    <input type="text" placeholder="John doe" className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring outline-none"/>
                </div>
                <div className="block mb-5">
                    <label>
                        <span className="text-gray-700">Email</span>
                    </label>
                    <input type="text" placeholder="Type your email here..." className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring outline-none"/>
                </div>
                <div>
                    <label>
                        <span className="text-gray-700">Comments</span>
                    </label>
                    <textarea placeholder="Comments" rows={8} className="shadow border rounded py-2 px-3 form-textarea mt-2 block w-full ring-yellow-500 focus:ring outline-none"/>
                </div>
            </form>
        </div>
    );
}


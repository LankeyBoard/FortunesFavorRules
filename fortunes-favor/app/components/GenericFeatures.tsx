
type genericFeature = {
    title: string;
    text: string;
    multiSelect?: boolean;
    options?: string[];
}

const Feature = ({feature}: {feature: genericFeature}) => {
    return(
        <div className="py-2 mx-5" key={feature.title}>
            <span className="font-semibold">
                {feature.title}
            </span>
            <span>
                &nbsp;- {feature.text}
            </span>
            {feature.options &&
            <div className="ml-5 mt-2">
                <ul>
                    {feature.options.map((text) => {return(<li><span className="text-amber-600">- </span>{text}</li>)})}
                </ul>
                {feature.multiSelect &&
                <div className="mt-2 italic text-slate-300">
                    You can select this multiple times, choosing a different option each time.
                </div>
                }
            </div>
            }
        </div>
    )
}

type genericFeaturesProps = {
    features_json: genericFeature[];
}

const GenericFeatures = ({features_json}: genericFeaturesProps) => {
    return(
        <div className="divide-slate-700 divide-y">
            {features_json.map((feature: genericFeature) => {
                return(
                    <Feature feature={feature}/>
                )
            })}
        </div>
    )
}

export default GenericFeatures;
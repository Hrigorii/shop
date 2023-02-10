import React from "react";
import ContentLoader from "react-content-loader";


export function MyLoader(props) {
	console.log('MyLoader');
	return (
		<>
			{
				[...Array(8)].map((item, index) => (
					<ContentLoader key={index}
						speed={2}
						width={275}
						height={350}
						viewBox="0 0 275 350"
						backgroundColor="#f3f3f3"
						foregroundColor="#ecebeb"
						{...props}
					>
						<rect x="56" y="16" rx="10" ry="10" width="150" height="150" />
						<rect x="207" y="241" rx="0" ry="0" width="40" height="22" />
						<rect x="107" y="294" rx="0" ry="0" width="40" height="22" />
						<rect x="2" y="241" rx="0" ry="0" width="40" height="22" />
						<rect x="2" y="294" rx="0" ry="0" width="40" height="22" />
						<rect x="207" y="294" rx="0" ry="0" width="40" height="22" />
						<rect x="3" y="186" rx="0" ry="0" width="243" height="40" />
					</ContentLoader>
				))
			}
		</>
	)

}


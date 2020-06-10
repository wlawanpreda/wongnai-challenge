import Head from 'next/head'
import List from "../components/list";

export default function Home() {
    return (
        <div className="container">
            <Head>
                <title>Review Cha</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main style={{ margin: "20px 100px" }}>
                <List />
            </main>


            <style jsx>{`
                .container {
                min-height: 100vh;
                padding: 0 0.5rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                }

                main {
                padding: 5rem 0;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                }


                a {
                color: inherit;
                text-decoration: none;
                }


                .title {
                margin: 0;
                line-height: 1.15;
                font-size: 4rem;
                }

                .title,
                .description {
                text-align: center;
                }

            `}</style>

            <style jsx global>{`
                html,
                body {
                padding: 0;
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                    sans-serif;
                }

                * {
                box-sizing: border-box;
                }
                keyword {
                    color: darkorange;
                    font-weight: bold;
                }
            `}</style>
        </div>
    )
}
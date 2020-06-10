import Head from 'next/head';
import { useRouter } from 'next/router';
import EditForm from "../../components/editForm";

export default function edit(props) {

    const router = useRouter()
    const { id } = router.query;

    if(!id) return `loading...`;
    console.log("PJ-LOG: edit -> id", id)

    return (
        <div className="container">
            <Head>
                <title>edit review</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <EditForm id={id} />
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
                    padding: 2.5rem 2.5rem;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    max-width: 90%;
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
                
            `}</style>
        </div>
    )
}


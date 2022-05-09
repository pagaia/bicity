import Head from 'next/head';
import ExternalLink from '../components/ExternalLink';

const CopyrightPolicy = () => {
    return (
        <>
            <Head>
                <title>BiCity - city for cyclists - Copyright and licensing policy</title>
            </Head>
            <div className="container">
                <h1 id="bicity-copyright-licensing-policy">
                    BiCity Copyright and licensing policy
                </h1>
                <p>
                    The BiCity Project is open data, licensed under the Open Data Commons Open
                    Database License (ODbL) by QBQUITY Sprl. QBQUITY Sprl is (and will remain in the
                    future) the owner of the copyright and the sui generis right on the BiCity
                    database.
                </p>
                <p>
                    You are free to copy, distribute, transmit and adapt our data, as long as you
                    credit BiCity Project and its contributors. If you alter or build upon our data,
                    you may distribute the result only under the same license. The full legal code
                    explains your rights and responsibilities.
                </p>
                <h1 id="how-to-credit">How to credit the BiCity Project</h1>
                <p>We require that you use the credit &ldquo;&copy; BiCity Project&rdquo;.</p>
                <p>
                    You must also make it clear that the data is available under the Open Database
                    License. You may do this by linking to this copyright page. Alternatively, and
                    as a requirement if you are distributing BiCity datasets in a data form, you can
                    name and link directly to the license(s). In media where links are not possible
                    (e.g. printed works), we suggest you direct your readers to{' '}
                    <ExternalLink url="https://bicity.info">https://bicity.info</ExternalLink> and
                    to{' '}
                    <ExternalLink url="https://opendatacommons.org">
                        https://opendatacommons.org
                    </ExternalLink>
                    .
                </p>
                <h1 id="source-and-ceredit">
                    <span>Sources of our data and related credits</span>
                </h1>
                <p>
                    In addition to publishing the data uploaded by users, the BiCity Project
                    collects and integrates data in the public domain or released under open
                    licenses, coming from the following sources:
                </p>
                <table className="mt-5">
                    <tbody>
                        <tr>
                            <td>Source</td>
                            <td>Link</td>
                            <td>License</td>
                        </tr>
                        <tr>
                            <td>Rome Municipality</td>
                            <td>
                                <ExternalLink url="https://dati.comune.roma.it/catalog/dataset/atac-002/resource/7c6341b4-efb0-4eb0-b9c4-da7ab7ce43b4">
                                    PARCHEGGI DI SCAMBIO
                                </ExternalLink>
                                <br />
                                <ExternalLink url="https://dati.comune.roma.it/catalog/dataset/d106">
                                    Incidenti stradali nel territorio di Roma Capitale - Anno 2021
                                </ExternalLink>
                                <br />
                                <ExternalLink url="https://dati.comune.roma.it/catalog/dataset/d881">
                                    Dati sui Mercati Rionali
                                </ExternalLink>
                                <br />
                                <ExternalLink url="https://dati.comune.roma.it/catalog/dataset/suar2021">
                                    Strutture ricettive di Roma Capitale nel 2021
                                </ExternalLink>
                                <br />
                                <ExternalLink url="https://dati.comune.roma.it/catalog/dataset/d876">
                                    Incidenti stradali nel territorio di Roma Capitale - Anno 2020
                                </ExternalLink>
                                <br />
                            </td>
                            <td>CC BY 4.0</td>
                        </tr>

                        <tr>
                            <td>Friuli Venezia Giulia Region</td>
                            <td>
                                <ExternalLink url="https://dati.gov.it/view-dataset/dataset?id=b5e89478-7a93-4b39-848c-75ed2d9367e4">
                                    Ciclovie
                                </ExternalLink>
                            </td>
                            <td>IODL 2.0</td>
                        </tr>
                        <tr>
                            <td>Trentino Region</td>
                            <td>
                                <ExternalLink url="https://dati.trentino.it/dataset/bba6b391-99cb-4617-9aae-654d503bb037">
                                    Piste ciclopedonali del Trentino
                                </ExternalLink>
                            </td>
                            <td>CC0 1.0</td>
                        </tr>
                        <tr>
                            <td>Bologna Municipality</td>
                            <td>
                                <ExternalLink url="https://opendata.comune.bologna.it/explore/dataset/lavori-pubblici/map/?disjunctive.roadway1&amp;disjunctive.roadway2&amp;disjunctive.roadway3&amp;disjunctive.neighborhood1&amp;disjunctive.address&amp;location=12,44.53922,11.31317&amp;basemap=85181b">
                                    Lavori in corso in città
                                </ExternalLink>
                                <br />
                                <ExternalLink url="https://opendata.comune.bologna.it/explore/dataset/piste-ciclopedonali/information/?location=14,44.50143,11.34562&amp;basemap=jawg.streets">
                                    Piste e itinerari ciclabili
                                </ExternalLink>
                                <br />
                                <ExternalLink url="https://opendata.comune.bologna.it/explore/dataset/mercati-e-fiere/custom/">
                                    Mercati e fiere
                                </ExternalLink>
                                <br />
                            </td>
                            <td>CC BY 4.0</td>
                        </tr>

                        <tr>
                            <td>Bologna Municipality</td>
                            <td>
                                <ExternalLink url="https://opendata.comune.bologna.it/explore/dataset/rastrelliere-per-biciclette/information/">
                                    Rastrelliere per biciclette
                                </ExternalLink>
                                <br />
                                <ExternalLink url="https://opendata.comune.bologna.it/explore/dataset/parcheggi/information/?location=13,44.49314,11.35265&amp;basemap=jawg.streets">
                                    Elenco dei parcheggi coperti e aperti a Bologna
                                </ExternalLink>
                                <br />
                            </td>
                            <td>CC BY 3.0 IT</td>
                        </tr>

                        <tr>
                            <td>Bergamo Municipality</td>
                            <td>
                                <ExternalLink url="https://dati.gov.it/view-dataset/dataset?id=494a27f2-7d34-4eb7-83e7-c8fa1f1bc3ab">
                                    Bike sharing
                                </ExternalLink>
                            </td>
                            <td>CC0 1.0</td>
                        </tr>
                        <tr>
                            <td>Lecce Municipality</td>
                            <td>
                                <ExternalLink url="http://dati.comune.lecce.it/dataset/rete-ciclabile-ed-escursionistica-esistente-e-pianificata-2019-comune-di-lecce">
                                    Rete ciclabile ed escursionistica esistente e pianificata 2019 -
                                    Comune di Lecce
                                </ExternalLink>
                            </td>
                            <td>CC BY 4.0</td>
                        </tr>
                        <tr>
                            <td>Brescia Municipality</td>
                            <td>
                                <ExternalLink url="https://dati.gov.it/view-dataset/dataset?id=b7c43bd0-badf-4d28-902c-d4355bacb93f">
                                    Piste Ciclabili Provincia di Brescia
                                </ExternalLink>
                            </td>
                            <td>CC0 1.0</td>
                        </tr>
                        <tr>
                            <td>San Donato Milanese Municipality</td>
                            <td>
                                <ExternalLink url="https://dati.gov.it/view-dataset/dataset?id=abebc051-c06f-45fb-a617-b92388cae896">
                                    Bike sharing
                                </ExternalLink>
                            </td>
                            <td>CC0 1.0</td>
                        </tr>
                        <tr>
                            <td>Busto Arsizio Municipality</td>
                            <td>
                                <ExternalLink url="https://dati.gov.it/view-dataset/dataset?id=fad742b4-6b37-4262-80a9-895495fab478">
                                    Bike sharing
                                </ExternalLink>
                            </td>
                            <td>CC0 1.0</td>
                        </tr>
                        <tr>
                            <td>Cremona Municipality</td>
                            <td>
                                <ExternalLink url="https://dati.gov.it/view-dataset/dataset?id=8e03ae23-18dd-4f66-b69a-92419d6465bd">
                                    Piste ciclabili
                                </ExternalLink>
                            </td>
                            <td>CC BY 4.0</td>
                        </tr>
                        <tr>
                            <td>Bergamo Municipality</td>
                            <td>
                                <ExternalLink url="https://dati.gov.it/view-dataset/dataset?id=12cbaa05-d431-41ed-883e-a80c3b852327">
                                    Aree di sosta
                                </ExternalLink>
                            </td>
                            <td>IODL 2.0</td>
                        </tr>
                        <tr>
                            <td>Cremona Municipality</td>
                            <td>
                                <ExternalLink url="https://dati.gov.it/view-dataset/dataset?id=a8cdb9f2-83bb-42d0-9e13-0a021a224133">
                                    Bike sharing{' '}
                                </ExternalLink>
                            </td>
                            <td>CC0 1.0</td>
                        </tr>
                        <tr>
                            <td>Villanuova Sul Clisi Municipality</td>
                            <td>
                                <ExternalLink url="https://www.dati.lombardia.it/Mobilit-e-trasporti/COMUNE-VILLANUOVA-SUL-CLISI-piste-ciclabili/mp23-x98g">
                                    Piste ciclabili{' '}
                                </ExternalLink>
                            </td>
                            <td>CC0 1.0</td>
                        </tr>
                        <tr>
                            <td>San Benedetto Po Municipality</td>
                            <td>
                                <ExternalLink url="https://dati.gov.it/view-dataset/dataset?id=6905ba0a-e1e7-4526-8aef-168a92068a37">
                                    Bike sharing
                                </ExternalLink>
                            </td>
                            <td>CC BY 4.0</td>
                        </tr>
                        <tr>
                            <td>Ro&egrave; Volciano Municipality</td>
                            <td>
                                <ExternalLink url="https://www.dati.lombardia.it/Mobilit-e-trasporti/COMUNE-ROE-VOLCIANO-piste-ciclabili/mtde-s5yc">
                                    Piste ciclabili
                                </ExternalLink>
                            </td>
                            <td>CC0 1.0</td>
                        </tr>
                        <tr>
                            <td>Rho Municipality</td>
                            <td>
                                <ExternalLink url=" https://www.dati.lombardia.it/Mobilit-e-trasporti/COMUNE-RHO-A3-11-piste-ciclabili/rw29-m2ha">
                                    Piste ciclabili
                                </ExternalLink>
                            </td>
                            <td>CC0 1.0</td>
                        </tr>
                        <tr>
                            <td>Milano Municipality</td>
                            <td>
                                <ExternalLink url="https://www.dati.lombardia.it/Mobilit-e-trasporti/Elenco-Terminal-Intermodali/j8tx-dpg9/data">
                                    Elenco Terminal Intermodali
                                </ExternalLink>
                            </td>
                            <td>CC0 1.0</td>
                        </tr>
                        <tr>
                            <td>Bergamo Municipality</td>
                            <td>
                                <ExternalLink url="https://dati.gov.it/view-dataset/dataset?id=7f63d09e-bef0-4376-8dcf-b36547a5700a">
                                    Rastrelliere biciclette
                                </ExternalLink>
                            </td>
                            <td>IODL 2.0</td>
                        </tr>
                        <tr>
                            <td>Lecco Municipality</td>
                            <td>
                                <ExternalLink url="https://www.dati.lombardia.it/Mobilit-e-trasporti/Comune-di-Lecco-Bike-sharing/de58-6npp">
                                    Bike Sharing
                                </ExternalLink>
                            </td>
                            <td>CC0 1.0</td>
                        </tr>
                        <tr>
                            <td>Bergamo Municipality</td>
                            <td>
                                <ExternalLink url="https://www.dati.lombardia.it/Mobilit-e-trasporti/Comune-Bergamo-Piste-ciclabili/bs2c-n3v3">
                                    Piste ciclabili
                                </ExternalLink>
                            </td>
                            <td>IODL 2.0</td>
                        </tr>
                        <tr>
                            <td>Lecco Municipality</td>
                            <td>
                                <ExternalLink url="https://dati.gov.it/view-dataset/dataset?id=b71b1feb-794f-439e-a6f2-acdb1b4f2e99">
                                    Piste ciclabili
                                </ExternalLink>
                            </td>
                            <td>CC0 1.0</td>
                        </tr>
                        <tr>
                            <td>Pavia Municipality</td>
                            <td>
                                <ExternalLink url="https://www.dati.lombardia.it/Mobilit-e-trasporti/COMUNE-PAVIA-Bike-Sharing/e7di-i93s">
                                    Bike Sharing
                                </ExternalLink>
                                <br />
                                <ExternalLink url="https://dati.gov.it/view-dataset/dataset?id=d0c1f823-7ce0-4809-9e24-8b0f84a1dc66">
                                    Piste ciclabili
                                </ExternalLink>
                                <br />
                            </td>
                            <td>CC BY 4.0</td>
                        </tr>

                        <tr>
                            <td>Trentino Region</td>
                            <td>
                                <ExternalLink url="https://dati.gov.it/view-dataset/dataset?id=415bc382-9dc3-4b02-8f62-abac2f67d1c7">
                                    Stazioni Bikesharing Trentino
                                </ExternalLink>
                            </td>
                            <td>CC BY 4.0</td>
                        </tr>
                        <tr>
                            <td>Milano Municipality</td>
                            <td>
                                <ExternalLink url="https://dati.comune.milano.it/dataset/ds79_infogeo_aree_sosta_car_sharing_localizzazione_/resource/be7a84f9-d1dd-4f28-9a5e-125ae1fc3254">
                                    Aree di Sosta Car sharing
                                </ExternalLink>
                                <br />
                                <ExternalLink url="https://dati.comune.milano.it/dataset/ds65_infogeo_aree_sosta_bike_sharing_localizzazione_/resource/2d0bafbc-1739-4a14-9e5a-71a648e1fc5b">
                                    Stazioni BikeMi
                                </ExternalLink>
                                <br />
                                <ExternalLink url="https://dati.comune.milano.it/dataset/ds1438_aree_velocita_limitata/resource/aee05bae-7b2f-4d8f-85d6-02755d9d768a?inner_span=True">
                                    Aree a velocità limitata
                                </ExternalLink>
                                <br />

                                <ExternalLink url="https://dati.comune.milano.it/dataset/ds342-trafficotrasporti-parcheggi-pubblici-localizzazione/resource/ff380c4b-b07a-4cd2-8e47-d451d2c50f17?view_id=08818b09-4d9b-45c2-910b-edaccf0de711">
                                    Mobilità: localizzazione dei parcheggi pubblici
                                </ExternalLink>
                                <br />

                                <ExternalLink url="https://dati.comune.milano.it/dataset/ds670-trasporto-pubblico-sosta-biciclette">
                                    Sosta biciclette
                                </ExternalLink>
                                <br />
                                <ExternalLink url="https://dati.comune.milano.it/dataset/ds176-trafficotrasporti-incidenti-stradali-persone-infortunate-mese-natura-incidente">
                                    Mobilità: incidenti stradali e persone infortunate per mese e
                                    natura dell'incidente
                                </ExternalLink>
                                <br />

                                <ExternalLink url="https://dati.comune.milano.it/dataset/ds60_infogeo_piste_ciclabili_localizzazione_">
                                    Piste ciclabili
                                </ExternalLink>
                                <br />

                                <ExternalLink url="https://dati.comune.milano.it/dataset/ds45_infogeo_parcheggi_interscambio_localizzazione_">
                                    Mobilità: localizzazione dei parcheggi di interscambio
                                </ExternalLink>
                                <br />
                            </td>
                            <td>CC BY 4.0</td>
                        </tr>

                        <tr>
                            <td>Florence Municipality</td>
                            <td>
                                <ExternalLink url="https://opendata.comune.fi.it/?q=metarepo/datasetinfo&id=be9ee992-0126-4b8d-afd7-16da15bfda71">
                                    Aree riservate alla sosta del bike sharing
                                </ExternalLink>
                                <br />
                            </td>
                            <td>CC BY 4.0</td>
                        </tr>
                        <tr>
                            <td>Naples Municipality</td>
                            <td></td>
                            <td>Italian Open Data Licence 2.0</td>
                        </tr>
                        <tr>
                            <td>Genova Municipality</td>
                            <td>
                                <ExternalLink url="https://dati.comune.genova.it/dataset/parcheggi">
                                    Parcheggi
                                </ExternalLink>
                            </td>
                            <td>CC BY 4.0</td>
                        </tr>
                        <tr>
                            <td>Open Street Map</td>
                            <td>
                                <ExternalLink url=" https://wiki.openstreetmap.org/wiki/Key:amenity">
                                    Open Street Map amenities
                                </ExternalLink>
                            </td>
                            <td>ODbL</td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    Inclusion of data in BiCity does not imply that the original data provider
                    endorses QBQUITY Sprl, provides any warranty, or accepts any liability.
                </p>
                <h1 id="software-licencing">Software Licensing</h1>
                <h2 id="software-developed-by-bicity">
                    Software originally developed by BiCity Project
                </h2>
                <p>
                    The BiCity Project normally releases its original software under the terms of
                    the GNU Affero General Public License (AGPL). This license permits use,
                    modification, and (re)distribution of BiCity software provided that all
                    modifications and additions are also distributed under the terms of the AGPL.
                </p>
                <h2 id="software-developed-by-third-party">Software developed by third parties</h2>
                <p>
                    In some cases The BiCity Project uses and integrates in its software components
                    developed by third parties. BiCity tries as much as possible to use and
                    integrate software that is released under open source licenses compatible with
                    the GNU AGPL.
                </p>
                <p>
                    However, in some cases it is not possible or not appropriate to use the AGPL;
                    for example when BiCity software is based on existing open source software that
                    uses a different and &#39;incompatible&#39; license. In these cases the related
                    packages may be redistributed by BiCity as a mere aggregation without
                    integration with the original BiCity software, and each package remains governed
                    by its respective license.
                </p>
                <p>
                    Below is a list of software components developed by third parties and used by
                    BiCity Project, with their respective licenses.
                </p>
                
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>Link</td>
                            <td>License</td>
                        </tr>
                        <tr>
                            <td>reduxjs/toolkit</td>
                            <td>
                                <ExternalLink url="https://github.com/reduxjs/redux-toolkit">
                                    https://github.com/reduxjs/redux-toolkit
                                </ExternalLink>
                            </td>
                            <td>MIT</td>
                        </tr>
                        <tr>
                            <td>axios</td>
                            <td>
                                <ExternalLink url="https://github.com/axios/axios">
                                    https://github.com/axios/axios
                                </ExternalLink>
                            </td>
                            <td>MIT</td>
                        </tr>
                        <tr>
                            <td>classnames</td>
                            <td>
                                <ExternalLink url="https://github.com/JedWatson/classnames">
                                    https://github.com/JedWatson/classnames
                                </ExternalLink>
                            </td>
                            <td>MIT</td>
                        </tr>
                        <tr>
                            <td>formik</td>
                            <td>
                                <ExternalLink url="https://github.com/jaredpalmer/formik">
                                    https://github.com/jaredpalmer/formik
                                </ExternalLink>
                            </td>
                            <td>Apache-2.0</td>
                        </tr>
                        <tr>
                            <td>leaflet</td>
                            <td>
                                <ExternalLink url="https://github.com/Leaflet/Leaflet">
                                    https://github.com/Leaflet/Leaflet
                                </ExternalLink>
                            </td>
                            <td>BSD-2-Clause</td>
                        </tr>
                        <tr>
                            <td>leaflet-defaulticon-compatibility</td>
                            <td>
                                <ExternalLink url="https://github.com/ghybs/leaflet-defaulticon-compatibility#readme">
                                    https://github.com/ghybs/leaflet-defaulticon-compatibility#readme
                                </ExternalLink>
                            </td>
                            <td>BSD-2-Clause</td>
                        </tr>
                        <tr>
                            <td>leaflet-geosearch</td>
                            <td>
                                <ExternalLink url="https://github.com/smeijer/leaflet-geosearch">
                                    https://github.com/smeijer/leaflet-geosearch
                                </ExternalLink>
                            </td>
                            <td>MIT</td>
                        </tr>
                        <tr>
                            <td>leaflet.markercluster</td>
                            <td>
                                <ExternalLink url="https://github.com/Leaflet/Leaflet.markercluster">
                                    https://github.com/Leaflet/Leaflet.markercluster
                                </ExternalLink>
                            </td>
                            <td>MIT</td>
                        </tr>
                        <tr>
                            <td>next</td>
                            <td>
                                <ExternalLink url="https://github.com/vercel/next.js">
                                    https://github.com/vercel/next.js
                                </ExternalLink>
                            </td>
                            <td>MIT</td>
                        </tr>
                        <tr>
                            <td>react</td>
                            <td>
                                <ExternalLink url="https://github.com/facebook/react">
                                    https://github.com/facebook/react
                                </ExternalLink>
                            </td>
                            <td>MIT</td>
                        </tr>
                        <tr>
                            <td>react-dom</td>
                            <td>
                                <ExternalLink url="https://www.npmjs.com/package/react-dom">
                                    https://www.npmjs.com/package/react-dom
                                </ExternalLink>
                            </td>
                            <td>MIT</td>
                        </tr>
                        <tr>
                            <td>react-leaft</td>
                            <td>
                                <ExternalLink url="https://github.com/PaulLeCam/react-leaflet/blob/master/LICENSE.md">
                                    https://github.com/PaulLeCam/react-leaflet/blob/master/LICENSE.md
                                </ExternalLink>
                            </td>
                            <td>Hippocratic License Version Number: 2.1.</td>
                        </tr>
                        <tr>
                            <td>react-leaflet-markercluster</td>
                            <td>
                                <ExternalLink url="https://www.npmjs.com/package/react-leaflet-markercluster">
                                    https://www.npmjs.com/package/react-leaflet-markercluster
                                </ExternalLink>
                            </td>
                            <td>MIT</td>
                        </tr>
                        <tr>
                            <td>sharp</td>
                            <td>
                                <ExternalLink url="https://www.npmjs.com/package/sharp">
                                    https://www.npmjs.com/package/sharp
                                </ExternalLink>
                            </td>
                            <td>Apache-2.0</td>
                        </tr>
                        <tr>
                            <td>bcrypt</td>
                            <td>
                                <ExternalLink url="https://github.com/kelektiv/node.bcrypt.js/blob/master/LICENSE">
                                    https://github.com/kelektiv/node.bcrypt.js/blob/master/LICENSE
                                </ExternalLink>
                            </td>
                            <td>MIT</td>
                        </tr>
                        <tr>
                            <td>boom</td>
                            <td>
                                <ExternalLink url="https://www.npmjs.com/package/@hapi/boom">
                                    https://www.npmjs.com/package/@hapi/boom
                                </ExternalLink>
                            </td>
                            <td>BSD-3-Clause</td>
                        </tr>
                        <tr>
                            <td>date-fns-tz</td>
                            <td>
                                <ExternalLink url="https://github.com/marnusw/date-fns-tz/blob/master/LICENSE.md">
                                    https://github.com/marnusw/date-fns-tz/blob/master/LICENSE.md
                                </ExternalLink>
                            </td>
                            <td>MIT</td>
                        </tr>
                        <tr>
                            <td>dotenv</td>
                            <td>
                                <ExternalLink url="https://github.com/motdotla/dotenv/blob/master/LICENSE">
                                    https://github.com/motdotla/dotenv/blob/master/LICENSE
                                </ExternalLink>
                            </td>
                            <td>BSD-2-Clause</td>
                        </tr>
                        <tr>
                            <td>fastify</td>
                            <td>
                                <ExternalLink url="https://github.com/fastify/fastify/blob/main/LICENSE">
                                    https://github.com/fastify/fastify/blob/main/LICENSE
                                </ExternalLink>
                            </td>
                            <td>MIT</td>
                        </tr>
                        <tr>
                            <td>fastify-auth</td>
                            <td>
                                <ExternalLink url="https://github.com/fastify/fastify-auth/blob/master/LICENSE">
                                    https://github.com/fastify/fastify-auth/blob/master/LICENSE
                                </ExternalLink>
                            </td>
                            <td>MIT</td>
                        </tr>
                        <tr>
                            <td>fastify-cookie</td>
                            <td>
                                <ExternalLink url="https://github.com/fastify/fastify-cookie/blob/master/LICENSE">
                                    https://github.com/fastify/fastify-cookie/blob/master/LICENSE
                                </ExternalLink>
                            </td>
                            <td>MIT</td>
                        </tr>
                        <tr>
                            <td>fastify-cors</td>
                            <td>
                                <ExternalLink url="https://github.com/fastify/fastify-cors/blob/master/LICENSE">
                                    https://github.com/fastify/fastify-cors/blob/master/LICENSE
                                </ExternalLink>
                            </td>
                            <td>MIT</td>
                        </tr>
                        <tr>
                            <td>fastify-jwt</td>
                            <td>
                                <ExternalLink url="https://github.com/fastify/fastify-jwt/blob/master/LICENSE">
                                    https://github.com/fastify/fastify-jwt/blob/master/LICENSE
                                </ExternalLink>
                            </td>
                            <td>MIT</td>
                        </tr>
                        <tr>
                            <td>fastify-swagger</td>
                            <td>
                                <ExternalLink url="https://github.com/fastify/fastify-swagger/blob/master/LICENSE">
                                    https://github.com/fastify/fastify-swagger/blob/master/LICENSE
                                </ExternalLink>
                            </td>
                            <td>MIT</td>
                        </tr>
                        <tr>
                            <td>mongoose</td>
                            <td>
                                <ExternalLink url="https://github.com/Automattic/mongoose/blob/master/LICENSE.md">
                                    https://github.com/Automattic/mongoose/blob/master/LICENSE.md
                                </ExternalLink>
                            </td>
                            <td>MIT</td>
                        </tr>
                        <tr>
                            <td>pino-pretty</td>
                            <td>
                                <ExternalLink url="https://github.com/pinojs/pino-pretty/blob/master/LICENSE">
                                    https://github.com/pinojs/pino-pretty/blob/master/LICENSE
                                </ExternalLink>
                            </td>
                            <td>MIT</td>
                        </tr>
                        <tr>
                            <td>boostrap</td>
                            <td>
                                <ExternalLink url="https://github.com/twbs/bootstrap/blob/v5.0.2/LICENSE">
                                    https://github.com/twbs/bootstrap/blob/v5.0.2/LICENSE
                                </ExternalLink>
                            </td>
                            <td>MIT</td>
                        </tr>
                        <tr>
                            <td>fontawesome</td>
                            <td>
                                <ExternalLink url="https://github.com/FortAwesome/Font-Awesome/blob/6.x/LICENSE.txt">
                                    https://github.com/FortAwesome/Font-Awesome/blob/6.x/LICENSE.txt
                                </ExternalLink>
                            </td>
                            <td>MIT/GPL/CC-BY4/SIL OPEN FONT LICENSE</td>
                        </tr>
                    </tbody>
                </table>
                <h1 id="intellectual-property" className='mt-5'>
                    <span>Intellectual property rights</span>
                    <span>&nbsp;infringement</span>
                </h1>
                <p>
                    BiCity Project contributors are reminded never to add data which constitute a
                    substantial part of a protected database, without explicit permission from the
                    intellectual property rights holders.
                </p>
                <p>
                    If you believe that protected material has been inappropriately added to the
                    BiCity database or this site, please refer to our takedown procedure or file
                    directly writing an email to legal@bicity.info.
                </p>
                <h1 id="trademarks">
                    <span>Trademarks</span>
                </h1>
                <p>
                    The BiCity name and logo and the QBQUITY name and logo are trademarks of QBQUITY
                    Sprl. If you have questions about your use of the marks, please send an email to
                    legal@bicity.info.
                </p>
                <p>
                    <span>Latest update of this document: May 10, 2022</span>
                </p>
            </div>
        </>
    );
};

export default CopyrightPolicy;

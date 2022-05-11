import Head from 'next/head';
import Link from 'next/link';
import ExternalLink from '../components/ExternalLink';
import { ROUTES } from '../utils/routes';

const PrivacyPolicy = () => {
    return (
        <>
            <Head>
                <title>BiCity - city for cyclists - Privacy Policy</title>
            </Head>
            <div className="container">
                <h2 id="introduction">Introduction</h2>
                <p>
                    This document states the BiCity Project privacy policy for services formally
                    operated and provided by the company{' '}
                    <ExternalLink url="https://qbquity.com">QBQUITY Sprl</ExternalLink> through the{' '}
                    <ExternalLink url="https://bicity.info">bicity.info</ExternalLink> website, the
                    connected app for mobile devices and the associated services and APIs. It
                    describes what personal information we may be gathering from you, who can see
                    this information, and what options you have for controlling this. We value your
                    privacy and strive to achieve a balance between the legitimate interests of the
                    BiCity Project and your interests and rights. This document is mainly intended
                    for BiCity Project contributors; if you are using services provided by the
                    QBQUITY Sprl without contributing, section “Data we receive automatically” will
                    be most relevant for you.
                </p>
                <h2 id="data-controller">Data controller </h2>
                <p>
                    The data controller is <b>QBQUITY Sprl</b>
                    (we/us). You can contact us here: Address: rue Général Molitor 14 - 1040
                    Brussels (Brussels) Belgium Email: legal@bicity.info
                </p>
                <h2 id="processing">
                    Lawfulness of processing (why do we store and process personal data?)
                </h2>
                <p>
                    The purpose of the BiCity Project and QBQUITY Sprl is to provide open geographic
                    data to anyone, in particular data related to cycling and all services that are
                    useful for cyclists.
                </p>
                <h3 id="purpose">Purposes of personal data processing</h3>
                <ol>
                    <li>
                        To provide the federated authentication service in order to access the
                        Resources requested by the User. To verify and monitor the proper
                        functioning of the service and ensure its security (legitimate interest -
                        art. GDPR 6.1 f).
                    </li>
                    <li>
                        To fulfill any legal obligations or requests from the judicial authorities
                        (GDPR art. 6.1 c).
                    </li>
                    <li>
                        {' '}
                        In order to guarantee the service requested by the user (GDPR art. 6.1 b).
                    </li>
                    <li>
                        The controller processes your voluntarily disclosed personal data - only for
                        registered users (name, surname, nickname, e-mail address, user preferences,
                        geolocation) on the basis of your freely expressed consent (GDPR art. 6.1 a)
                        for sending newsletters.
                    </li>
                </ol>
                <h2 id="what-data-do-we-store">What data do we store and process?</h2>
                <h3 id="account-data"> Account data</h3>
                <p>
                    When a User wants to actively contributes to BiCity Project, he/she can create
                    an account, providing the following data (all required):
                    <ul>
                        <li>Username</li>
                        <li>Valid email address</li>
                        <li>Name/First Name</li>
                        <li>Surname/Last Name</li>
                    </ul>
                </p>
                <h3 id="contributions">Contributions to BiCity Project</h3>
                <p>
                    When a Registered User actively contributes to BiCity Project by uploading data
                    via the web or via mobile app, the data collected are the following:
                    <ul>
                        <li>
                            editing session meta-data. For example comments added by the user, any
                            version and similar information added by the editing application, which
                            editing application and which aerial imagery layers where used.
                        </li>
                        <li>
                            user id and login name of the author of every change to an object and a
                            timestamp when that change occured.
                        </li>
                        <li>the name, surname or nickname associated with your account.</li>
                        <li>any blocks the user has received and associated messages.</li>
                        <li>
                            network access data (example IP addresses) for the systems and services
                            operated by the QBQUITY Sprl (see
                            <a href="#automatic-data">“Data we receive automatically”</a>).
                        </li>
                    </ul>
                </p>
                <h2 id="automatic-data">Data we receive automatically</h2>
                <p>
                    When you visit the BiCity Project website, access any of the BiCity Project
                    services via a browser or via applications that utilize the provided APIs,
                    records of that use are produced; we collect information about your browser or
                    application and your interaction with our website, including: (a) IP address,
                    (b) browser and device type, (c) operating system, (d) referring web page, (e)
                    the date and time of page visits, and (f) the pages accessed on our websites.
                </p>
                <p>
                    Further we may operate user interaction tracking software that will generate
                    additional records of user activity, for example AWstats.
                    <br />
                    Services that use Geo-DNS or similar mechanisms to distribute load to
                    geographically distributed servers will potentially generate a record of your
                    location at a large scale (for example the BiCity tile cache network determines
                    the country you are likely to be located in and directs your requests to an
                    appropriate server).
                </p>
                <p>
                    These records are used or can be used in the following ways:
                    <ul>
                        <li>
                            in support of the operation of the services from a technical, security
                            and planning point of view.
                        </li>
                        <li>as anonymised, summarised data for research and other purposes.</li>
                        <li>
                            to improve the BiCity Project dataset. For example by analysing
                            nominatim queries for missing addresses and postcodes and providing such
                            data to the BiCity community.
                        </li>
                    </ul>
                </p>
                <p>
                    The data collected on the systems will be accessible by the system
                    administrators. No personal information or information that is linked to an
                    individual will be released to third parties, except as required by law. The
                    above mentioned data is processed on a legitimate interest basis (see GDPR
                    article 6.1f ).
                </p>
                <h2 id="who-has-access-to-the-data"> Who has access to the data</h2>
                <p>
                    We do not share email addresses associated with accounts with any third party
                    and they are only accessible to our operations and working group personnel that
                    have signed confidentiality agreements. User to user messages are visible to the
                    sender and recipient, other access is limited to our operations staff and only
                    if required for operational reasons, to enforce our acceptable use policies, to
                    fulfil any legal obligations and most notably to prevent SPAM.
                    <br />
                    Similarly, network access data is only used for internal purposes and access is
                    limited to operating personnel for operational and vandalism and SPAM protection
                    purposes.
                </p>
                <h2 id="where-store-data"> Where do we store the data</h2>
                The website, API servers, databases and the servers for auxiliary services are
                currently located in the Netherlands. <br />
                Map tiles are provided by a global network of cache servers, which tile server your
                browser or app access is determined dynamically by geolocation of the IP address and
                selection of the cache server "nearest" to you. While in general this means that you
                will be using the tile cache physically nearest to you, this can be affected by
                <ul>
                    <li>
                        uncertainties in determining the location of the client from its IP address
                    </li>
                    <li>operational issues (server downtime etc)</li>
                    <li>network topology and load</li>
                </ul>
                <h2 id="user-rights"> User Rights according to the GDPR</h2>
                In accordance with Articles 7, 13, 15, 16, 17, 18, 19, 20, 21, 22 of the UE
                Regulation 679/2016 you can, at any time, exercise the following rights, by
                contacting the Controller:
                <ul>
                    <li>
                        the right to obtain from the Controller confirmation as to whether or not
                        personal data concerning you are being processed;
                    </li>
                    <li>the right to obtain the access to your personal data;</li>
                    <li>
                        the right to request from the Controller rectification or erasure of your
                        personal data;
                    </li>
                    <li>
                        the right to request from the Controller restriction of processing of your
                        personal data;
                    </li>
                    <li>the right to object to the processing of your personal data;</li>
                    <li>
                        the right to receive the personal data concerning you, which you have
                        provided to Controller, in a structured, commonly used and machine-readable
                        format and the right to transmit those data to another controller without
                        hindrance from the controller to which the personal data have been provided
                        (data portability).
                    </li>
                </ul>
                <p>
                    Furthermore, if you believe that your rights have not been respected, you can
                    file a complaint with the competent Supervisory Authority.
                </p>
                <h2 id="control-processing-your-data">
                    How can you control the processing of your data and reduce privacy related
                    issues
                </h2>
                <p>
                    While not required by law, we provide the following mechanism to reduce the
                    exposure of potentially privacy related information for you.
                    <ul>
                        <li>
                            you can select a non identifying login name and change it at any time
                            you want,
                        </li>
                        <li>
                            you can request your account to be deleted (restrictions see below) and
                            this will be conveyed to registered entities that are using our full
                            data.
                        </li>
                    </ul>
                    You should not enable gravatar support or use an e-mail address you have
                    associated with a gravatar with if privacy is a concern. <br />
                    You can further reduce exposure by not adding personal information to the map
                    data (personal names and similar). Such information is in general not considered
                    to be an useful addition to our data and you should refrain from adding it.
                </p>
                <h2 id="detailed-information">Detailed Information </h2>
                <p>
                    The registered email address for a BiCity user account will never intentionally
                    be published on the internet anywhere, shared with third party organizations, or
                    revealed directly to other users. Only system administrators will have direct
                    access to email address data associated with the BiCity account. It may be used
                    by these people to contact users directly about their edits or other QBQUITY
                    Sprl related issues.
                </p>
                <h2 id="gravatar">Gravatar</h2>
                <p>
                    The <ExternalLink url="https://bicity.info">bicity.info</ExternalLink> website
                    supports the display of Gravatars, these are retrieved from{' '}
                    <ExternalLink url="https://gravatar.com/">gravatar.com</ExternalLink> by
                    generating a globally unique key from your e-mail address. Our website software
                    will check on the initial signup and on every email address change if you have a
                    Gravatar for the new address and start displaying it if one exists. You can stop
                    this behaviour by explicitly turning Gravatar support off in your account
                    settings. You should be aware that, if a Gravatar is displayed, the key can be
                    used to track your account over any website that has Gravatar support.
                </p>
                <h2 id="survey">Surveys</h2>
                <p>
                    The QBQUITY Sprl may conduct surveys within the users in order to determine the
                    opinions and better to serve the community. Distributing surveys and processing
                    their results may require the use of personal data such as names and email
                    addresses. Personal data gathered or used in connection with surveys will be
                    processed in accordance with applicable data privacy laws and will be retained
                    only as long as reasonably necessary.
                    <br />
                    Email addresses of the users may be used to invite them to participate in
                    surveys. If survey data are made publicly available the data will be anonymized.
                    Anonymized survey data, which may be useful to QBQUITY Sprl in the future for
                    comparison purposes, may be retained indefinitely in accordance with applicable
                    data privacy laws.
                </p>
                <h2 id="third-party-provided-services-and-data">
                    Third party provided services and data
                </h2>
                <p>
                    Third party services providing content linked to via or third party JavaScript
                    files utilised by BiCity Project website are not covered by this policy and you
                    will need to refer to the respective service providers for more information.
                    Using these services will typically transmit at least your Internet address and
                    browser information to the operators. <br />
                    These are specifically:
                    <ul>
                        <li>
                            geodata from Geoapify.com (see{' '}
                            <ExternalLink url="https://www.geoapify.com/privacy-policy">
                                privacy policy
                            </ExternalLink>
                            )
                        </li>
                        <li>
                            icons from Fontawesome.com (see{' '}
                            <ExternalLink url="https://fontawesome.com/privacy">
                                privacy policy
                            </ExternalLink>
                            )
                        </li>
                        <li>
                            fonts from Google Font (see{' '}
                            <ExternalLink url="https://policies.google.com/privacy">
                                privacy policy
                            </ExternalLink>
                            )
                        </li>
                        <li>
                            Boostrap provided by Jsdelivr.com (see{' '}
                            <ExternalLink url="https://www.jsdelivr.com/terms/privacy-policy-jsdelivr-net">
                                privacy policy
                            </ExternalLink>
                            )
                        </li>
                        <li>
                            MapQuest: (see{' '}
                            <ExternalLink url="https://system1.com/terms/privacy-policy">
                                privacy policy
                            </ExternalLink>
                            )
                        </li>
                        <li>
                            Gravatar images in user profiles that display these are provided by Aut
                            O’Mattic A8C Ireland Ltd., Business Centre, No.1 Lower Mayor Street,
                            International Financial Services Centre, Dublin 1, Ireland (see{' '}
                            <ExternalLink url="https://automattic.com/privacy/">
                                privacy policy
                            </ExternalLink>
                            )
                        </li>
                        <li>
                            Open Street Map (see{' '}
                            <ExternalLink url="https://wiki.osmfoundation.org/wiki/Privacy_Policy">
                                privacy policy
                            </ExternalLink>
                            )
                        </li>
                    </ul>
                </p>
                <h2 id="login-external-services">
                    Login via external services (social login and similar)
                </h2>
                <p>
                    The user can interact with BiCity services even without creating an account; he
                    can also use the systems of other external platforms such as, for example,
                    Google, Facebook, LinkedIn, Twitter, Github, or similar. In the event that the
                    user accesses in this way, we point out that personal data may be transferred to
                    non-EU countries based on the privacy policy adopted by the various platforms
                    (we invite the user to refer to the relevant policies).
                </p>
                <h2 id="account-removal">Account Removal</h2>
                <p>
                    You can request your account to be removed and we will honor such requests as
                    far as possible. If you have not actively contributed to the project we will not
                    retain any records. If you have contributed your account will be renamed to
                    user_
                    <i>&lt;USERID&gt;</i> and contributions and changeset comments will be retained
                    with this name. In your request for account removal you need to identify all
                    accounts that are affected as we do not have information on which accounts
                    belong to which BiCity id.
                </p>
                <h2>Duration of Data Storage</h2>
                <p>
                    All personal data collected to provide the service (name, surname, e-mail
                    address, nickname) will be stored for as long as necessary to provide the
                    service. <br />
                    The browsing data (for example, IdP service log records etc.) will be deleted
                    after 14 (fourteen) days. <br />
                    Longer retention periods are provided only in the event of a request by the
                    judicial authority in order to ascertain crimes or for accounting or tax
                    obligations to which the controller is subject.
                </p>
                <h2>Cross-border transfers of personal data</h2>
                <p>....</p>
                <h2>Cookies</h2>
                <p>
                    Some BiCity operated services use cookies to store information on your login and
                    site navigation state. We also use cookies and similar technologies to recognize
                    and improve your use of our websites. You may delete cookies from your computer,
                    and most browsers provide the option to block them. If you block cookies placed
                    by us (first party cookies), you will not be able to access parts of the BiCity
                    website and services that require a login. However, your access to our websites
                    will not be affected if you disable cookies placed by third parties. More
                    precisely, the cookies installed by the BiCity website are the following:
                    <table className="mt-3">
                        <thead>
                            <tr>
                                <th>COOKIE</th>
                                <th>TYPE</th>
                                <th>DURATION</th>
                                <th>DESCRIPTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td label="COOKIE">__Host-refreshToken</td>
                                <td label="TYPE">Essential</td>
                                <td label="DURATION">1 week</td>
                                <td label="DESCRIPTION">
                                    It's used by the BiCity application to remember the logged user
                                    for the next 7 days
                                </td>
                            </tr>
                            <tr>
                                <td label="COOKIE">JSESSIONID</td>
                                <td label="TYPE">Essential</td>
                                <td label="DURATION">Session (expires when the brower closes)</td>
                                <td label="DESCRIPTION">
                                    It's used by the MAPQUEST when performing geo location of the
                                    address
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </p>
                <h2>Other Relevant Policies</h2>
                <p>
                    As well as privacy issues, users and contributors must also be aware of the{' '}
                    <Link href={ROUTES.TERMS_OF_SERVICE}>
                        <a>BiCity Terms of Service</a>
                    </Link>{' '}
                    and the{' '}
                    <Link href={ROUTES.COPYRIGHT_POLICY}>
                        <a>BiCity Copyright Policy</a>
                    </Link>
                    .
                </p>
            </div>
        </>
    );
};

export default PrivacyPolicy;

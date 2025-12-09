import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {
return (
<Html lang="en">
<Head>
<script src="https://cdn.tailwindcss.com"></script>
<script
dangerouslySetInnerHTML={{
__html: `tailwind.config = {
theme: {
extend: {
colors: {
christmasRed: '#b91c1c',
christmasGreen: '#166534'
}
}
}
}`
}}
/>
</Head>
<body className="bg-gradient-to-b from-slate-900 via-black to-slate-900 text-white">
<Main />
<NextScript />
</body>
</Html>
)
}
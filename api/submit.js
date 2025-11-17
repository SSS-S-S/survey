// /api/submit.js
export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const googleFormUrl =
            "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdrwvNZCGTF4nZQshi9F5e1Yy9B-BQsnmtkw_fegtdu4Ochbg/formResponse";

        const params = new URLSearchParams(req.body);

        const googleRes = await fetch(googleFormUrl, {
            method: "POST",
            body: params,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        return res.status(200).json({ success: true });
    } catch (e) {
        return res.status(500).json({ error: "Server error", detail: e.toString() });
    }
}

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health Check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", app: "Makena & Associates Ltd" });
  });

  // AI Construction & Feasibility Advisor using Gemini API
  app.post("/api/ai-advisor", async (req, res) => {
    const { prompt, projectContext } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemInstruction = `You are the AI Construction & Feasibility Advisor for Makena & Associates Ltd, an integrated architectural design, quantity surveying, and construction management firm in Kenya (headquartered in Ol Kalou, Nyahururu, serving Kenya nationwide).
You provide professional, accurate, and structured advice on:
1. Kenyan building regulations, NCA (National Construction Authority) compliance, NEMA environmental impact assessments, and county permit processes.
2. Cost planning, Bills of Quantities (BQ), and BORAQS/AAK fee scales.
3. Architectural considerations for Kenya's highland climate (thermal mass, natural ventilation, rainwater harvesting, local stone/timber).
4. Foundation and structural guidance based on soil types (black cotton soil vs. highland red soil).
5. Estimated construction timelines and cost optimization (value engineering).

Keep responses structured with clear headings, bullet points, and practical advice suited for property owners, developers, and investors in Kenya. Always speak warmly on behalf of Makena & Associates Ltd.`;

        const fullPrompt = `${systemInstruction}\n\nClient Project Context: ${JSON.stringify(projectContext || {})}\n\nUser Question: ${prompt}`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: fullPrompt,
        });

        const text = response.text || "Thank you for reaching out. We have analyzed your query.";
        return res.json({ response: text });
      } catch (err: any) {
        console.error("Gemini API error:", err);
        // Fallback gracefully below
      }
    }

    // Fallback response if API key is not present or error occurs
    const lowerPrompt = prompt.toLowerCase();
    let fallbackText = "";

    if (lowerPrompt.includes("cost") || lowerPrompt.includes("fee") || lowerPrompt.includes("price") || lowerPrompt.includes("budget")) {
      fallbackText = `### Construction Cost & Fee Guidance from Makena & Associates Ltd

**1. Estimated Rates in Kenya (2025/2026):**
* **Standard Residential:** KES 38,000 - KES 48,000 per sq.m
* **Premium Residential / Villas:** KES 50,000 - KES 70,000 per sq.m
* **Commercial / Mixed-Use:** KES 45,000 - KES 65,000 per sq.m
* **Industrial / Warehouse:** KES 28,000 - KES 40,000 per sq.m

**2. Integrated QS & Architectural Fees:**
* Scale of fees follows BORAQS & AAK gazetted rates (typically 5% - 8% of total construction cost, split between design and supervision).
* **Integrated Savings:** By combining Architecture and Quantity Surveying in one firm, we eliminate scope gaps and variation claims, typically saving 8%–12% in total project cost.

**Recommendation:** Use our interactive **Cost Estimator Tool** on this page or schedule a consultation with our QS team for a detailed BQ analysis.`;
    } else if (lowerPrompt.includes("nca") || lowerPrompt.includes("permit") || lowerPrompt.includes("approval") || lowerPrompt.includes("nema") || lowerPrompt.includes("county")) {
      fallbackText = `### Regulatory Approval Pathway in Kenya

**Required Approvals for Construction:**
1. **Architectural & Structural Approval:** Submitted to the relevant County Government Planning Department.
2. **NEMA Clearance:** Environmental Impact Assessment (EIA) summary or full study depending on scale.
3. **NCA Project Registration:** Project registration with the National Construction Authority (NCA) and contractor compliance verification.
4. **Water & Drainage Clearance:** County public health and water resources authority (WRA) compliance.

**Estimated Approvals Timeline:** 6 to 10 weeks when managed by our registered professionals.`;
    } else {
      fallbackText = `### Project Feasibility Assessment by Makena & Associates Ltd

Thank you for inquiring about your building project!

**Key Factors for Successful Project Delivery:**
* **Integrated Design & BQ:** Ensure architectural concepts are matched to a live Bill of Quantities from Day 1.
* **Highland Climate Performance:** Utilize local materials, optimal orientation, and rainwater harvesting to lower operational costs.
* **Site Evaluation:** Geotechnical assessment (especially for black cotton or highland red soils) before excavation.

**Next Step:** You can use our **Project Cost Estimator** on this platform, or submit a **Consultation Request** to speak directly with James Mwangi (Principal Architect) or Grace Njoroge (Senior Quantity Surveyor).`;
    }

    return res.json({ response: fallbackText });
  });

  // Consultation Submission Endpoint
  app.post("/api/consultation", (req, res) => {
    const consultation = req.body;
    console.log("New Consultation Request Received:", consultation);

    return res.json({
      success: true,
      message: "Consultation request successfully registered with Makena & Associates Ltd.",
      referenceCode: `MA-${Math.floor(100000 + Math.random() * 900000)}`,
      receivedAt: new Date().toISOString(),
    });
  });

  // Serve Vite in Development, Static in Production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

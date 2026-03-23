type EligibilityRow = {
  phase_key: string;
  status: string;
};

type RequestBody = {
  wallet?: string;
};

type D1Statement = {
  bind: (...values: string[]) => {
    first<T>(): Promise<T | null>;
  };
};

type D1Binding = {
  prepare: (query: string) => D1Statement;
};

type FunctionContext = {
  request: Request;
  env: {
    DB: D1Binding;
  };
};

const json = (body: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    ...init,
  });

export const onRequestPost = async (context: FunctionContext) => {
  try {
    const body = (await context.request.json()) as RequestBody;
    const wallet = (body.wallet || "").trim().toLowerCase();
    const evmRegex = /^0x[a-f0-9]{40}$/;
    const megaRegex = /^[a-z0-9-]+\.mega$/;

    if (!wallet || (!evmRegex.test(wallet) && !megaRegex.test(wallet))) {
      return json({ ok: false, error: "Invalid wallet address." }, { status: 400 });
    }

    const record = await context.env.DB
      .prepare(
        `SELECT phase_key, status
         FROM eligibility
         WHERE wallet = ?
         ORDER BY
           CASE
             WHEN phase_key = 'gtd' THEN 1
             WHEN phase_key = 'fcfs' THEN 2
             ELSE 99
           END ASC
         LIMIT 1`
      )
      .bind(wallet)
      .first<EligibilityRow>();

    return json({
      ok: true,
      eligible: Boolean(record && record.status === "eligible"),
      phase: record?.phase_key ?? null,
      status: record?.status ?? "not_found",
    });
  } catch (error) {
    console.error("Eligibility check failed", error);

    return json({ ok: false, error: "Internal server error." }, { status: 500 });
  }
};

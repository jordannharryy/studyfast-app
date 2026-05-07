exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://studyfast.uk',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { email, firstname, groups } = JSON.parse(event.body);

    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': 'https://studyfast.uk' },
        body: JSON.stringify({ error: 'Invalid email' }),
      };
    }

    const res = await fetch('https://api.sender.net/v2/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOWM5ZTc5OTViN2IzNDg5YjFmMWM2OGIwZjdhYWM0ZWI3OTUyMmM3YmIyMzMzMDRjMjc1MzExZjRlYmE5M2YxYThjOTdmMzFmZDllZjlmNTEiLCJpYXQiOjE3NzYxNjM1NDUuODMzODU5LCJuYmYiOjE3NzYxNjM1NDUuODMzODYxLCJleHAiOjQ5Mjk3NjcxNDUuODMxNzc0LCJzdWIiOiIxMDY2NDk5Iiwic2NvcGVzIjpbXX0.oc8ZU6uXB7wRyoLOg5_vb0jsD-m1Yhgte4sJTe_ZZpMLY-6Gk7hZkzTViQKbFTplQGhs7iWhFUMTPzq6R6_Fvtg1R0Mnp6s-MCp6qLymlsrplWzg-UfgxSLbSvjK68dS_caII55BFhBwu2rvSyxj2HXnLf1m7NSR_c5SQCdszN2w_JCr_2faD01AM6YKQ4LobEOGsT_1EcDlncgJGqRLb8STa60haI45kjv48wzIGCBobKJ71pVA6u2KVzYQrsvCRbKmWFGg-jEP_DMoOZZOArmDfm7QHlGQHmZ8l5QMmDd9vogrPo5bmhshyBzWYESuLy3oHGvS9427q5DNYxCAHX-1HqgbdcUOFTOnm7fVTmhci8jib0qQh-_5_7KCvDT-RwMkjwwX5xOa7RGaECM3CEmNt27B21DbAOWBfyGFCf5pCtYus8rNiNlliLyUpBqYSynjKDXndBLVEfmPW2FlEoHRZ1dmJnKdJ3AsTUKp8etLAobv2OgT-Io1pEecxW0XAv_0tVpLSM6XmD54nu7tb92VCnooIoZLNtbV8CVnKtDDcpjn8MiAnY3dqGwu6Aw7Ab0VWRQ3dP_GF-mXGd9wVa3Ds8jA1GnJiU9Xb4nBE2zj1H9olbwRoGtILdvnfug9apDmPKZpVT8fQrBapd3R3IzAA-igP5tCucQRurCzJ1Q',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, firstname, groups }),
    });

    if (!res.ok && res.status !== 409) {
      throw new Error('Sender API error: ' + res.status);
    }

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': 'https://studyfast.uk' },
      body: JSON.stringify({ success: true }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': 'https://studyfast.uk' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};

const fs = require('fs');
const readline = require('readline');

const transcriptPath = '/Users/jitendraatale/.gemini/antigravity-ide/brain/3e5a2fe0-f4bf-4e7c-bc97-1eba5bceaa1c/.system_generated/logs/transcript_full.jsonl';

async function recoverFiles() {
  const fileStream = fs.createReadStream(transcriptPath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let latestStartBusiness = null;
  let latestWizardJs = null;

  for await (const line of rl) {
    try {
      const step = JSON.parse(line);
      if (step.tool_calls) {
        for (const tc of step.tool_calls) {
          if (tc.name === 'write_to_file' || tc.name === 'replace_file_content' || tc.name === 'multi_replace_file_content') {
            const target = tc.args.TargetFile;
            if (target && target.includes('start-business.html') && tc.args.CodeContent) {
              latestStartBusiness = tc.args.CodeContent;
            }
            if (target && target.includes('assets/js/wizard.js') && tc.args.CodeContent) {
              latestWizardJs = tc.args.CodeContent;
            }
          }
        }
      }
    } catch (e) {}
  }

  if (latestStartBusiness) {
    fs.writeFileSync('start-business.html', latestStartBusiness);
    console.log("Recovered start-business.html from transcript.");
  } else {
    console.log("Could not find full write of start-business.html.");
  }
  
  if (latestWizardJs) {
    fs.writeFileSync('assets/js/wizard.js', latestWizardJs);
    console.log("Recovered assets/js/wizard.js from transcript.");
  } else {
    console.log("Could not find full write of assets/js/wizard.js.");
  }
}

recoverFiles();

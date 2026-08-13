export function generateBuilderTitle(stack: string): string {
  if (!stack || !stack.trim()) {
    return 'THE PROTOCOL BUILDER';
  }

  const s = stack.toLowerCase();

  // Keyword mappings sorted by specificity
  if (s.includes('ai') || s.includes('llm') || s.includes('gpt') || s.includes('rag') || s.includes('transformer') || s.includes('agent')) {
    return 'THE MODEL WHISPERER';
  }
  if (s.includes('ml') || s.includes('machine learning') || s.includes('deep learning') || s.includes('pytorch') || s.includes('tensorflow')) {
    return 'THE NEURAL ARCHITECT';
  }
  if (s.includes('web3') || s.includes('solidity') || s.includes('crypto') || s.includes('chain') || s.includes('smart contract') || s.includes('ethereum') || s.includes('solana') || s.includes('evm')) {
    return 'THE CHAIN WEAVER';
  }
  if (s.includes('full') || (s.includes('front') && s.includes('back')) || s.includes('fullstack') || s.includes('full-stack')) {
    return 'THE STACK WARRIOR';
  }
  if (s.includes('front') || s.includes('react') || s.includes('next') || s.includes('vue') || s.includes('css') || s.includes('tailwind') || s.includes('pixel') || s.includes('ui/ux') || s.includes('ui') || s.includes('frontend')) {
    return 'THE PIXEL ALCHEMIST';
  }
  if (s.includes('back') || s.includes('api') || s.includes('database') || s.includes('sql') || s.includes('node') || s.includes('express') || s.includes('java') || s.includes('go') || s.includes('golang') || s.includes('backend')) {
    return 'THE API ARCHITECT';
  }
  if (s.includes('rust') || s.includes('c++') || s.includes('systems') || s.includes('kernel') || s.includes('low level') || s.includes('embedded') || s.includes('zig')) {
    return 'THE SILICON WRANGLER';
  }
  if (s.includes('devops') || s.includes('cloud') || s.includes('aws') || s.includes('docker') || s.includes('k8s') || s.includes('kubernetes') || s.includes('infra') || s.includes('terraform')) {
    return 'THE CLOUD SHAMAN';
  }
  if (s.includes('sec') || s.includes('cyber') || s.includes('hack') || s.includes('reverse') || s.includes('ctf') || s.includes('pentest') || s.includes('audit')) {
    return 'THE CYBER SENTINEL';
  }
  if (s.includes('mobile') || s.includes('flutter') || s.includes('react native') || s.includes('ios') || s.includes('swift') || s.includes('kotlin') || s.includes('android')) {
    return 'THE NATIVE FORGER';
  }
  if (s.includes('data') || s.includes('analytics') || s.includes('pandas') || s.includes('spark') || s.includes('pipeline') || s.includes('etl')) {
    return 'THE DATA DIVINER';
  }
  if (s.includes('design') || s.includes('figma') || s.includes('creative') || s.includes('3d') || s.includes('three.js') || s.includes('webgl') || s.includes('shader')) {
    return 'THE VECTOR VISIONARY';
  }
  if (s.includes('game') || s.includes('unity') || s.includes('unreal') || s.includes('godot')) {
    return 'THE REALM CRAFTER';
  }

  // Fallbacks based on word length or hash
  const titles = [
    'THE MATRIX SHAPER',
    'THE PROTOTYPE NINJA',
    'THE ZERO-TO-ONE BUILDER',
    'THE BYTE SURGEON',
    'THE CODE MAESTRO',
    'THE SYNTAX CHRONICLER'
  ];

  let sum = 0;
  for (let i = 0; i < stack.length; i++) {
    sum += stack.charCodeAt(i);
  }
  return titles[sum % titles.length];
}

export function generateIdNumber(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `HH/2026-${num}`;
}

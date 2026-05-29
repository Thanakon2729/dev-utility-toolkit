import { Component } from '@angular/core';

type CommandItem = {
  title: string;
  category: string;
  type: 'kubectl' | 'linux';
  command: string;
  description: string;
};

type DiffToken = {
  type: 'same' | 'added' | 'removed';
  text: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  view: 'commands' | 'diff' = 'commands';
  mode: 'kubectl' | 'linux' = 'kubectl';
  searchText = '';
  diffType: 'text' | 'json' = 'text';
  diffMode: 'line' | 'char' = 'line';
  diffInputA = '';
  diffInputB = '';
  diffResult: DiffToken[] = [];

  commands: CommandItem[] = [
    {
      title: 'ดู Pods',
      category: 'Pod',
      type: 'kubectl',
      command: 'kubectl get pods',
      description: 'ใช้ดูรายการ pods ทั้งหมดใน namespace ปัจจุบัน'
    },
    {
      title: 'ดู Pods ทุก Namespace',
      category: 'Pod',
      type: 'kubectl',
      command: 'kubectl get pods -A',
      description: 'ใช้ดู pods ทุก namespace'
    },
    {
      title: 'ดู Logs',
      category: 'Logs',
      type: 'kubectl',
      command: 'kubectl logs <pod-name>',
      description: 'ดู log ของ pod'
    },
    {
      title: 'เข้า Shell ใน Pod',
      category: 'Debug',
      type: 'kubectl',
      command: 'kubectl exec -it <pod-name> -- sh',
      description: 'เข้า shell ของ container'
    },
    {
      title: 'Describe Pod',
      category: 'Debug',
      type: 'kubectl',
      command: 'kubectl describe pod <pod-name>',
      description: 'ดูรายละเอียด pod และ event'
    },
    {
      title: 'Restart Deployment',
      category: 'Deployment',
      type: 'kubectl',
      command: 'kubectl rollout restart deployment <deployment-name>',
      description: 'restart deployment'
    },
    {
      title: 'ดู Services',
      category: 'Service',
      type: 'kubectl',
      command: 'kubectl get svc',
      description: 'ดู service ทั้งหมด'
    },
    {
      title: 'ดู Nodes',
      category: 'Cluster',
      type: 'kubectl',
      command: 'kubectl get nodes',
      description: 'ดู node ทั้งหมดใน cluster'
    },
    {
      title: 'Apply YAML',
      category: 'YAML',
      type: 'kubectl',
      command: 'kubectl apply -f app.yaml',
      description: 'deploy yaml เข้า cluster'
    },
    {
      title: 'Delete Resource',
      category: 'Delete',
      type: 'kubectl',
      command: 'kubectl delete pod <pod-name>',
      description: 'ลบ pod'
    },
    {
      title: 'ดูไฟล์ในโฟลเดอร์',
      category: 'File',
      type: 'linux',
      command: 'ls -la',
      description: 'แสดงรายการไฟล์พร้อมรายละเอียดในโฟลเดอร์ปัจจุบัน'
    },
    {
      title: 'ดูตำแหน่งที่อยู่ปัจจุบัน',
      category: 'Shell',
      type: 'linux',
      command: 'pwd',
      description: 'แสดง path ของ working directory ปัจจุบัน'
    },
    {
      title: 'เปลี่ยนโฟลเดอร์',
      category: 'Shell',
      type: 'linux',
      command: 'cd /path/to/directory',
      description: 'เปลี่ยนไปยัง directory ใหม่'
    },
    {
      title: 'ดูเนื้อหาไฟล์',
      category: 'File',
      type: 'linux',
      command: 'cat filename.txt',
      description: 'อ่านเนื้อหาไฟล์ข้อความ'
    },
    {
      title: 'ค้นหาคำในไฟล์',
      category: 'Search',
      type: 'linux',
      command: "grep -R 'text' .",
      description: 'ค้นหาข้อความในไฟล์ทั้งหมดในโฟลเดอร์'
    },
    {
      title: 'ดูการใช้งานดิสก์',
      category: 'System',
      type: 'linux',
      command: 'df -h',
      description: 'ดูพื้นที่ดิสก์ที่ใช้งานและเหลืออยู่'
    },
    {
      title: 'ดูโปรเซสทำงาน',
      category: 'System',
      type: 'linux',
      command: 'top',
      description: 'แสดงโปรเซสและการใช้งานทรัพยากรแบบเรียลไทม์'
    }
  ];

  get filteredCommands(): CommandItem[] {
    const query = this.searchText.toLowerCase();
    return this.commands.filter(item =>
      item.type === this.mode &&
      (item.title.toLowerCase().includes(query) ||
        item.command.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query))
    );
  }

  setView(view: 'commands' | 'diff', mode: 'kubectl' | 'linux' = 'kubectl'): void {
    this.view = view;
    this.mode = mode;
    if (view === 'commands') {
      this.searchText = '';
    }
    this.diffResult = [];
  }

  copyCommand(command: string): void {
    navigator.clipboard.writeText(command);
    alert('Copied: ' + command);
  }

  compareDiff(): void {
    let a = this.diffInputA;
    let b = this.diffInputB;

    if (this.diffType === 'json') {
      try {
        a = JSON.stringify(JSON.parse(a), null, 2);
        b = JSON.stringify(JSON.parse(b), null, 2);
      } catch (error) {
        this.diffResult = [{ type: 'removed', text: `Invalid JSON: ${error instanceof Error ? error.message : error}` }];
        return;
      }
    }

    this.diffResult = this.diffMode === 'line'
      ? this.diffLines(a, b)
      : this.diffChars(a, b);
  }

  private diffLines(a: string, b: string): DiffToken[] {
    const aLines = a.split('\n');
    const bLines = b.split('\n');
    const n = aLines.length;
    const m = bLines.length;
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

    for (let i = n - 1; i >= 0; i--) {
      for (let j = m - 1; j >= 0; j--) {
        dp[i][j] = aLines[i] === bLines[j]
          ? dp[i + 1][j + 1] + 1
          : Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }

    const result: DiffToken[] = [];
    let i = 0;
    let j = 0;
    while (i < n || j < m) {
      if (i < n && j < m && aLines[i] === bLines[j]) {
        result.push({ type: 'same', text: aLines[i] });
        i++; j++;
      } else if (j < m && (i === n || dp[i][j + 1] >= dp[i + 1][j])) {
        result.push({ type: 'added', text: bLines[j] });
        j++;
      } else {
        result.push({ type: 'removed', text: aLines[i] });
        i++;
      }
    }
    return result;
  }

  private diffChars(a: string, b: string): DiffToken[] {
    const n = a.length;
    const m = b.length;
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

    for (let i = n - 1; i >= 0; i--) {
      for (let j = m - 1; j >= 0; j--) {
        dp[i][j] = a[i] === b[j]
          ? dp[i + 1][j + 1] + 1
          : Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }

    const result: DiffToken[] = [];
    let i = 0;
    let j = 0;
    while (i < n || j < m) {
      if (i < n && j < m && a[i] === b[j]) {
        result.push({ type: 'same', text: a[i] });
        i++; j++;
      } else if (j < m && (i === n || dp[i][j + 1] >= dp[i + 1][j])) {
        result.push({ type: 'added', text: b[j] });
        j++;
      } else {
        result.push({ type: 'removed', text: a[i] });
        i++;
      }
    }
    return result;
  }
}
